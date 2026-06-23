import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';
import { DocumentStatus } from './enums/document-status.enum';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];

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
}