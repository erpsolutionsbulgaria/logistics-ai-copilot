import { z } from 'zod';

export const InvoiceExtractionSchema = z.object({
  invoiceNumber: z.string().nullable(),
  supplierName: z.string().nullable(),
  consigneeName: z.string().nullable(),
  totalAmount: z.number().nullable(),
  currency: z.string().nullable(),
});

export type InvoiceExtractionData = z.infer<
  typeof InvoiceExtractionSchema
>;