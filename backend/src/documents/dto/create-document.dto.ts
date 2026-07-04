import { IsEnum, IsString } from 'class-validator';
import { DocumentType } from '../../../generated/prisma/client.js';

export class CreateDocumentDto {
  @IsEnum(DocumentType)
  type!: DocumentType;

  @IsString()
  filename!: string;
}