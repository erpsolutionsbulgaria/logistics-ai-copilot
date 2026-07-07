import { Injectable } from '@nestjs/common';
import { ExtractionRequestDto } from '../dto/extraction-request.dto.js';
import { Prompt } from './prompt.interface.js';

@Injectable()
export class PromptBuilderService {
  buildExtractionPrompt(
    request: ExtractionRequestDto,
  ): Prompt {
    return {
      system: `
        You are an AI assistant specialized in logistics document extraction.
        Extract only the requested structured data.
        Return only valid JSON.
        `.trim(),

              user: `
        Document type: ${request.documentType}

        Document text:
        ${request.text}
        `.trim(),
    };
  }
}