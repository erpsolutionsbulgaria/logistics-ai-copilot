import { Injectable, NotFoundException } from '@nestjs/common';
import type { Issue, Shipment } from '@prisma/client';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { ShipmentStatus } from '@prisma/client';
import { DocumentsService } from '../documents/documents.service.js';
import { IssuesService } from '../issues/issues.service.js';
import { IssueSeverity } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly issuesService: IssuesService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(): Promise<Shipment[]> {
    return this.prismaService.shipment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.prismaService.shipment.findUnique({
      where: { id },
    });

    if (!shipment) {
      throw new NotFoundException(`Shipment ${id} not found`);
    }

    return shipment;
  }

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    return this.prismaService.shipment.create({
      data: {
        reference: createShipmentDto.reference,
        clientName: createShipmentDto.clientName,
        status: createShipmentDto.status ?? ShipmentStatus.DRAFT,
      },
    });
  }

  async validate(shipmentId: string) {
    const shipment = await this.findOne(shipmentId);

    const documents = await this.documentsService.findByShipmentId(shipmentId);

    const createdIssues: Promise<Issue>[] = [];

    if (documents.length === 0) {
      createdIssues.push(
        this.issuesService.create(
          shipment.id,
          IssueSeverity.HIGH,
          'Missing documents',
          'Shipment does not contain any uploaded documents.',
        ),
      );
    }

    const extractedDocuments = documents.filter(
      (document) =>
        document.status === 'EXTRACTED' || document.status === 'APPROVED',
    );

    if (documents.length > 0) {
      createdIssues.push(
        this.issuesService.create(
          shipment.id,
          IssueSeverity.MEDIUM,
          'No extracted documents',
          'Shipment has documents, but none of them have been processed yet.',
        ),
      );
    }

    for (const document of extractedDocuments) {
      const extractionResult = await this.documentsService.getExtractionResult(
        shipmentId,
        document.id,
      );
      const structuredData =
        (extractionResult?.structuredData as Record<string, unknown> | null) ??
        {};

      if (!extractionResult) {
        createdIssues.push(
          this.issuesService.create(
            shipment.id,
            IssueSeverity.HIGH,
            'Missing extraction result',
            `Document ${document.id} is marked as extracted but has no extraction result.`,
          ),
        );

        continue;
      }

      const invoiceNumber = structuredData.invoiceNumber;
      const totalAmount = structuredData.totalAmount;
      const currency = structuredData.currency;

      if (!invoiceNumber) {
        createdIssues.push(
          this.issuesService.create(
            shipment.id,
            IssueSeverity.MEDIUM,
            'Missing invoice number',
            `Document ${document.id} does not contain an invoice number.`,
          ),
        );
      }

      if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        createdIssues.push(
          this.issuesService.create(
            shipment.id,
            IssueSeverity.HIGH,
            'Invalid total amount',
            `Document ${document.id} has an invalid total amount.`,
          ),
        );
      }

      if (!currency) {
        createdIssues.push(
          this.issuesService.create(
            shipment.id,
            IssueSeverity.MEDIUM,
            'Missing currency',
            `Document ${document.id} does not contain currency information.`,
          ),
        );
      }
    }

    const issues = await Promise.all(createdIssues);

    return {
      shipmentId: shipment.id,
      documentsChecked: documents.length,
      issuesCreated: issues.length,
      issues,
    };
  }
}
