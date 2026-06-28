import { Injectable, NotFoundException } from '@nestjs/common';
import { $Enums, type Document, type ExtractionResult } from '../../generated/prisma/client.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DocumentStatus } from './enums/document-status.enum.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DocumentsService {
  constructor(private readonly prismaService: PrismaService) {}

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

    const extractionResult = await this.prismaService.extractionResult.create({
      data: {
        documentId: document.id,
        status: $Enums.ExtractionStatus.COMPLETED,
        promptVersion: null,
        structuredData: null,
        rawOutput: null,
        extractedFields: {
          create: [],
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


  

  async getExtractionResult(documentId: string): Promise<ExtractionResult | null> {
    return this.prismaService.extractionResult.findFirst({
      where: {
        documentId: documentId,
      },
    });
  }
}