import { Injectable } from '@nestjs/common';
import { AiProvider } from '../ai-provider.interface.js';
import { ExtractionResultDto } from '../../dto/extraction-result.dto.js';
import { ExtractionRequestDto } from 'src/ai/dto/extraction-request.dto.js';

@Injectable()
export class OpenAiProvider implements AiProvider {
  async extractStructuredData(
    request: ExtractionRequestDto,
  ): Promise<ExtractionResultDto> {
    return {
      structuredData: {
        invoiceNumber: 'INV-2026-001',
        supplierName: 'Acme Ltd',
        consigneeName: 'DHL Logistics',
        totalAmount: 12500,
        currency: 'EUR',
      },
      extractedFields: [
        {
          fieldName: 'invoiceNumber',
          value: 'INV-2026-001',
          confidence: 0.98,
        },
        {
          fieldName: 'supplierName',
          value: 'Acme Ltd',
          confidence: 0.95,
        },
        {
          fieldName: 'totalAmount',
          value: '12500',
          confidence: 0.9,
        },
        {
          fieldName: 'currency',
          value: 'EUR',
          confidence: 0.97,
        },
      ],
      model: process.env.OPENAI_MODEL ?? 'mock-model',
      promptVersion: 'v1',
      rawOutput: {
        source: 'mock-openai-provider',
        inputText: request.text,
      },
    };
  }
}