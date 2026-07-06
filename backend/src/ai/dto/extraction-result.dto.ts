import { Prisma } from "generated/prisma/browser";
import { ExtractedFieldDto } from "./extracted-field.dto";

export interface ExtractionResultDto {
  structuredData: Prisma.InputJsonValue;
  extractedFields: ExtractedFieldDto[];
  model: string;
  promptVersion: string;
  rawOutput: Prisma.InputJsonValue;
}