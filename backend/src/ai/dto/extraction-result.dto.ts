import { Prisma } from '@prisma/client';
import { ExtractedFieldDto } from './extracted-field.dto';
import { InvoiceExtractionData } from '../schemas/invoice-extraction.schema';

export interface ExtractionResultDto {
  structuredData: InvoiceExtractionData;
  extractedFields: ExtractedFieldDto[];
  model: string;
  promptVersion: string;
  rawOutput: Prisma.InputJsonValue;
}
