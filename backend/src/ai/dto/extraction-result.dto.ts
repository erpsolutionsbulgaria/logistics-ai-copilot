import { Prisma } from "generated/prisma/browser";
import { ExtractedFieldDto } from "./extracted-field.dto";
import { InvoiceExtractionData } from "../schemas/invoice-extraction.schema";

export interface ExtractionResultDto {
  structuredData: InvoiceExtractionData;
  extractedFields: ExtractedFieldDto[];
  model: string;
  promptVersion: string;
  rawOutput: Prisma.InputJsonValue;
}