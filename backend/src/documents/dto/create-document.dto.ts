import { IsEnum, IsString } from 'class-validator';
import { DocumentType } from '@prisma/client';

export class CreateDocumentDto {
  @IsEnum(DocumentType)
  type!: DocumentType;

  @IsString()
  filename!: string;

  @IsString()
  storagePath?: string;
}