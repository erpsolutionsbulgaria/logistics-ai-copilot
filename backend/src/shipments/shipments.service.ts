import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentStatus } from './enums/shipment-status.enum';
import { randomUUID } from 'crypto';
import { Shipment } from './entities/shipment.entity';
import { DocumentsService } from 'src/documents/documents.service';
import { IssuesService } from 'src/issues/issues.service';
import { IssueSeverity } from 'src/issues/enums/issue-severity.entity';
import { Issue } from 'src/issues/entities/issue.entity';

@Injectable()
export class ShipmentsService {
  private shipments: Shipment[] = [
    {
      id: randomUUID(),
      reference: 'SHP-001',
      clientName: 'Acme Logistics',
      status: ShipmentStatus.DRAFT,
    },
  ];

  constructor(
    private readonly documentsService: DocumentsService,
    private readonly issuesService: IssuesService,
  ) {}

  findAll(): Shipment[] {
    return this.shipments;
  }

  findOne(id: string): Shipment {
    const shipment = this.shipments.find(
      shipment => shipment.id === id,
    );

    if (!shipment) {
      throw new NotFoundException(
        `Shipment ${id} not found`,
      );
    }

    return shipment;
  }

  create(createShipmentDto: CreateShipmentDto): Shipment {
    console.log('>>>>>>> ', createShipmentDto);
    const shipment: Shipment = {
      id: randomUUID(),

      ...createShipmentDto,
      status: createShipmentDto.status ?? ShipmentStatus.DRAFT,
    };

    this.shipments.push(shipment);

    return shipment;
  }

  validate(shipmentId: string) {
    const shipment = this.findOne(shipmentId);
  
    const documents =
      this.documentsService.findByShipmentId(shipmentId);
  
    const createdIssues: Issue[] = [];
  
    if (documents.length === 0) {
      const issue = this.issuesService.create(
        shipment.id,
        IssueSeverity.HIGH,
        'Missing documents',
        'Shipment does not contain any uploaded documents.',
      );
  
      createdIssues.push(issue);
    }
  
    const extractedDocuments = documents.filter(
      (document) =>
        document.status === 'EXTRACTED' ||
        document.status === 'APPROVED',
    );
  
    if (documents.length > 0) {
      const issue = this.issuesService.create(
        shipment.id,
        IssueSeverity.MEDIUM,
        'No extracted documents',
        'Shipment has documents, but none of them have been processed yet.',
      );
  
      createdIssues.push(issue);
    }
  
    for (const document of extractedDocuments) {
      const extractionResult =
        this.documentsService.getExtractionResult(document.id);
  
      if (!extractionResult) {
        const issue = this.issuesService.create(
          shipment.id,
          IssueSeverity.HIGH,
          'Missing extraction result',
          `Document ${document.id} is marked as extracted but has no extraction result.`,
        );
  
        createdIssues.push(issue);
  
        continue;
      }
  
      if (!extractionResult.invoiceNumber) {
        createdIssues.push(
          this.issuesService.create(
            shipment.id,
            IssueSeverity.MEDIUM,
            'Missing invoice number',
            `Document ${document.id} does not contain an invoice number.`,
          ),
        );
      }
  
      if (
        extractionResult.totalAmount === undefined ||
        extractionResult.totalAmount <= 0
      ) {
        createdIssues.push(
          this.issuesService.create(
            shipment.id,
            IssueSeverity.HIGH,
            'Invalid total amount',
            `Document ${document.id} has an invalid total amount.`,
          ),
        );
      }
  
      if (!extractionResult.currency) {
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
  
    return {
      shipmentId: shipment.id,
      documentsChecked: documents.length,
      issuesCreated: createdIssues.length,
      issues: createdIssues,
    };
  }

  debugFillMemory(count: number) {
    for (let i = 0; i < count; i++) {
      this.shipments.push({
        id: crypto.randomUUID(),
        reference: `SHP-${i}`,
        clientName: 'Test',
        status: ShipmentStatus.DRAFT,
      });
    }
      return this.shipments.length;
  }
}