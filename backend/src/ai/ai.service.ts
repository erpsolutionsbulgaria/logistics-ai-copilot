import { Inject, Injectable } from '@nestjs/common';
import { ExtractionResultDto } from './dto/extraction-result.dto';
import * as aiProviderInterface from './providers/ai-provider.interface.js';
import { AI_PROVIDER } from './providers/ai-provider.token.js';
import { ExtractionRequestDto } from './dto/extraction-request.dto';

@Injectable()
export class AiService {
  constructor(
    @Inject(AI_PROVIDER)
    private readonly aiProvider: aiProviderInterface.AiProvider,
  ) {}

  async extractStructuredData(
    request: ExtractionRequestDto,
  ): Promise<ExtractionResultDto> {
    return this.aiProvider.extractStructuredData(request);
  }
}