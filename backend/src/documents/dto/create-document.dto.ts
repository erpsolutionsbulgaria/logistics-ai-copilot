import { IsEnum, IsString } from 'class-validator';
import { DocumentType } from '../enums/document-type.enum.js';

export class CreateDocumentDto {
  @IsEnum(DocumentType)
  type!: DocumentType;

  @IsString()
  filename!: string;
}