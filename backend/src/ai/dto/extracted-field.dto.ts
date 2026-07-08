import { ExtractedFieldStatus } from "generated/prisma/client";

export interface ExtractedFieldDto {
  fieldName: string;
  value: string;
  confidence: number;
  status: ExtractedFieldStatus;
}