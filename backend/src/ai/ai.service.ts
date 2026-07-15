import { Inject, Injectable } from '@nestjs/common';
import { ExtractionRequestDto } from './dto/extraction-request.dto.js';
import { ExtractionResultDto } from './dto/extraction-result.dto.js';
import * as aiProviderInterface from './providers/ai-provider.interface.js';
import { AI_PROVIDER } from './providers/ai-provider.token.js';
import { PromptBuilderService } from '../../src/ai/prompt/prompt-builder.service.js';
import { mapInvoiceDataToExtractedFields } from './mappers/extracted-field.mapper.js';

@Injectable()
export class AiService {
  constructor(
    @Inject(AI_PROVIDER)
    private readonly aiProvider: aiProviderInterface.AiProvider,
    private readonly promptBuilder: PromptBuilderService,
  ) {}

  async extractStructuredData(
    request: ExtractionRequestDto,
  ): Promise<ExtractionResultDto> {
    const prompt =
      this.promptBuilder.buildExtractionPrompt(request);

    const structuredData =
      await this.aiProvider.extractStructuredData(prompt);

    return {
      structuredData,
      extractedFields: mapInvoiceDataToExtractedFields(structuredData),
      model: process.env.OPENAI_MODEL ?? 'mock-model',
      promptVersion: 'v1',
      rawOutput: {
        source: 'openai',
        prompt: {
          system: prompt.system,
          user: prompt.user,
        },
      },
    };
  }
}