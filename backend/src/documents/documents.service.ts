import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';
import { DocumentStatus } from './enums/document-status.enum';
import { ExtractionResult } from './entities/extraction-result.entity';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  private extractionResults: ExtractionResult[] = [];

  findByShipmentId(shipmentId: string): Document[] {
    return this.documents.filter((document) => document.shipmentId === shipmentId);
  }

  create(shipmentId: string, createDocumentDto: CreateDocumentDto): Document {
    const document: Document = {
      id: randomUUID(),
      shipmentId,
      ...createDocumentDto,
      status: DocumentStatus.UPLOADED,
    };

    this.documents.push(document);

    return document;
  }

  process(shipmentId: string, documentId: string): Document {
    console.log('BAHURKA');
    const document = this.documents.find(
        (document) =>
        document.id === documentId &&
        document.shipmentId === shipmentId,
    );  
    if (!document) {
        throw new NotFoundException(`Document ${documentId} not found`);
    }  
    document.status = DocumentStatus.EXTRACTING;  
    // temporary mock extraction
    document.status = DocumentStatus.EXTRACTED;

    const extractionResult: ExtractionResult = {
      documentId: document.id,
      invoiceNumber: 'INV-2026-001',
      supplierName: 'Acme Ltd',
      consigneeName: 'DHL Logistics',
      totalAmount: 12500,
      currency: 'EUR',
    };
  
    this.extractionResults.push(extractionResult);
  
    return document;
  }

  getExtractionResult(documentId: string): ExtractionResult | undefined {
    console.log('BAHURKA');
    return this.extractionResults.find(
        result => result.documentId === documentId,
    );
  }
}