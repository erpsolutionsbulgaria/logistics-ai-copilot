import { Injectable } from '@nestjs/common';
import { ExtractionRequestDto } from '../dto/extraction-request.dto.js';
import { Prompt } from './prompt.interface.js';
import { InvoiceFieldConfig } from '../schemas/invoice-field.config.js';

@Injectable()
export class PromptBuilderService {

  private buildFieldInstructions(): string {
    return Object.values(InvoiceFieldConfig)
      .map(
        (field) =>
          `- ${field.label}: ${field.description} Type: ${field.type}. Required: ${field.required ? 'yes' : 'no'}.`,
      )
      .join('\n');
  }

  buildExtractionPrompt(
    request: ExtractionRequestDto,
  ): Prompt {
    const fieldInstructions = this.buildFieldInstructions();

    return {
      system: `
  You are an AI assistant specialized in logistics document extraction.
  Extract only the requested structured data.
  Return only valid JSON matching the provided schema.
  `.trim(),

      user: `
  Document type: ${request.documentType}

  Extract the following fields:
  ${fieldInstructions}

  Document text:
  ${request.text}
  `.trim(),
    };
  }
}