import { ExtractedFieldStatus } from '@prisma/client';
import { ExtractedFieldDto } from '../dto/extracted-field.dto.js';
import { InvoiceExtractionData } from '../schemas/invoice-extraction.schema.js';
import { InvoiceFieldConfig } from '../schemas/invoice-field.config.js';

export function mapInvoiceDataToExtractedFields(
  data: InvoiceExtractionData,
): ExtractedFieldDto[] {
  return Object.entries(data).map(([fieldName, value]) => {
    const config = InvoiceFieldConfig[fieldName as keyof typeof InvoiceFieldConfig];

    const confidence = 0.9;

    return {
      fieldName,
      value: value === null ? '' : String(value),
      confidence,
      status:
        confidence >= config.confidenceThreshold
          ? ExtractedFieldStatus.AUTO_ACCEPTED
          : ExtractedFieldStatus.NEEDS_REVIEW,
    };
  });
}