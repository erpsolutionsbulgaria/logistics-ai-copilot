import { Injectable } from '@nestjs/common';

@Injectable()
export class OcrService {
  extractTextFromDocument(storagePath: string): Promise<string> {
    return Promise.resolve(`
        Invoice No: INV-2026-777
        Supplier: Real Supplier Ltd
        Consignee: DHL Logistics
        Currency: EUR
        Total: 9876

        Source file: ${storagePath}
    `);
  }
}