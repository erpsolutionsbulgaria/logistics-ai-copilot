import { ExtractedFieldStatus } from '@prisma/client';

export interface ExtractedFieldDto {
  fieldName: string;
  value: string;
  confidence: number;
  status: ExtractedFieldStatus;
}
