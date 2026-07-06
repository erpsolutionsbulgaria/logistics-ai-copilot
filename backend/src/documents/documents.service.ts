import { Injectable, NotFoundException } from '@nestjs/common';
import { $Enums, ExtractedFieldStatus, type Document, type ExtractionResult } from '../../generated/prisma/client.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DocumentStatus } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AiService } from '../ai/ai.service.js';
import { ExtractionRequestDto } from 'src/ai/dto/extraction-request.dto.js';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService
  ) {}

  findByShipmentId(shipmentId: string): Promise<Document[]> {
    return this.prismaService.document.findMany({
      where: {
        shipmentId: shipmentId,
      },
    });
  }

  create(
    shipmentId: string,
    createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    return this.prismaService.document.create({
      data: {
        type: createDocumentDto.type,
        originalFilename: createDocumentDto.filename,
        status: DocumentStatus.UPLOADED,
        shipment: {
          connect: {
            id: shipmentId,
          },
        },
      },
    });
  }

  async process(shipmentId: string, documentId: string) {
    const document = await this.prismaService.document.findFirst({
      where: {
        id: documentId,
        shipmentId: shipmentId,
      },
    });

    if (!document) {
        throw new NotFoundException(`Document ${documentId} not found`);
    }  

    await this.prismaService.document.update({
      where: {
        id: document.id,
      },
      data: {
        status: DocumentStatus.EXTRACTING,
      },
    });

    const documentText = `
      Invoice No: INV-2026-001
      Supplier: Acme Ltd
      Consignee: DHL Logistics
      Currency: EUR
      Total: 12500
      `;

    const extractionRequest: ExtractionRequestDto = {
      text: documentText,
      documentType: document.type,
    };

    const aiExtraction = await this.aiService.extractStructuredData(extractionRequest);
    const extractionResult = await this.prismaService.extractionResult.create({
      data: {
        documentId: document.id,
        status: $Enums.ExtractionStatus.COMPLETED,
        model: aiExtraction.model,
        promptVersion: aiExtraction.promptVersion,
        structuredData: aiExtraction.structuredData,
        rawOutput: aiExtraction.rawOutput,
        extractedFields: {
          create: aiExtraction.extractedFields.map((field) => ({
            fieldName: field.fieldName,
            value: field.value,
            confidence: field.confidence,
            status: ExtractedFieldStatus.AUTO_ACCEPTED,
          })),
        },
      },
      include: {
        extractedFields: true,
      },
    });

    const updatedDocument = await this.prismaService.document.update({
      where: {
        id: document.id,
      },
      data: {
        status: DocumentStatus.EXTRACTED,
      },
    });
    
    return {
      document: updatedDocument,
      extractionResult,
    };
  }

  async getExtractionResult(shipmentId: string, documentId: string): Promise<ExtractionResult | null> {
    return this.prismaService.extractionResult.findFirst({
      where: {
        documentId: documentId,
        document: {
          shipmentId: shipmentId,
        },
      },
    });
  }
}