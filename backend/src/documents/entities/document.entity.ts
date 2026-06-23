import { DocumentStatus } from '../enums/document-status.enum';
import { DocumentType } from '../enums/document-type.enum';

export class Document {
  id!: string;
  shipmentId!: string;
  type!: DocumentType;
  filename!: string;
  status!: DocumentStatus;
}