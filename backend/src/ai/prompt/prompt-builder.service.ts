import { Injectable } from '@nestjs/common';
import { ExtractionRequestDto } from '../dto/extraction-request.dto.js';

@Injectable()
export class PromptBuilderService {
  buildExtractionPrompt(request: ExtractionRequestDto): string {
    return `
       You are an AI assistant specialized in logistics document extraction.
       
       Document type: ${request.documentType}
       
       Extract structured data from the following document text.
       Return only valid JSON.
       
       Document text:
       ${request.text}
    `;
  }
}