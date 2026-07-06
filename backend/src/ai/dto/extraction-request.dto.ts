import { DocumentType } from '../../../generated/prisma/client.js';

export interface ExtractionRequestDto {
  text: string;
  documentType: DocumentType;
}