import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { $Enums, ExtractedFieldStatus, type Document, type ExtractionResult } from '@prisma/client';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DocumentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { AiService } from '../ai/ai.service.js';
import { ExtractionRequestDto } from '../../src/ai/dto/extraction-request.dto.js';
import { OcrService } from '../../src/ocr/ocr.service.js';
// import { StorageService } from '../../src/storage/storage.service.js';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
    private readonly ocrService: OcrService,
    // private readonly storageService: StorageService
  ) {}

  findByShipmentId(shipmentId: string): Promise<Document[]> {
    return this.prismaService.document.findMany({
      where: {
        shipmentId: shipmentId,
      },
    });
  }

  async create(
    shipmentId: string,
    createDocumentDto: CreateDocumentDto
  ): Promise<Document> {

    return this.prismaService.document.create({
      data: {
        type: createDocumentDto.type,
        originalFilename: createDocumentDto.filename,
        storagePath: createDocumentDto.storagePath,
        status: DocumentStatus.UPLOADED,
        shipment: {
          connect: {
            id: shipmentId,
          },
        },
      },
    });
  }

  async process(
    shipmentId: string,
    documentId: string,
  ) {

    //TODO: could be refactored
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

    if (!document.storagePath) {
      throw new BadRequestException(
        `Document ${document.id} does not have a storage path`,
      );
    }

    const documentText = await this.ocrService.extractText(document.storagePath);

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
            status: field.status,
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

  // async getExtractionResult(shipmentId: string, documentId: string): Promise<ExtractionResult | null> {
  //   return this.prismaService.extractionResult.findFirst({
  //     where: {
  //       documentId: documentId,
  //       document: {
  //         shipmentId: shipmentId,
  //       },
  //     },
  //   });
  // }
}