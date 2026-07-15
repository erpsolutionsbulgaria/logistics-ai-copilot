import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { AiProvider } from '../ai-provider.interface.js';
import { Prompt } from '../../../ai/prompt/prompt.interface.js';
import {
  InvoiceExtractionData,
  InvoiceExtractionSchema,
} from '../../schemas/invoice-extraction.schema.js';

@Injectable()
export class OpenAiProvider implements AiProvider {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async extractStructuredData(
    prompt: Prompt,
  ): Promise<InvoiceExtractionData> {
    const response = await this.client.responses.parse({
      model: process.env.OPENAI_MODEL ?? 'gpt-5.5',
      input: [
        {
          role: 'system',
          content: prompt.system,
        },
        {
          role: 'user',
          content: prompt.user,
        },
      ],
      text: {
        format: zodTextFormat(
          InvoiceExtractionSchema,
          'invoice_extraction',
        ),
      },
    });

    if (!response.output_parsed) {
      throw new InternalServerErrorException(
        'OpenAI did not return structured extraction data',
      );
  }

    return response.output_parsed;
  }
}