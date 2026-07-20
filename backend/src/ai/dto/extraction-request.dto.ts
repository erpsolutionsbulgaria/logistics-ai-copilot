import { DocumentType } from '@prisma/client';

export interface ExtractionRequestDto {
  text: string;
  documentType: DocumentType;
}
