import { Module } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { OpenAiProvider } from './providers/openai/openai.provider.js';
import { AI_PROVIDER } from './providers/ai-provider.token.js';
import { PromptBuilderService } from './prompt/prompt-builder.service.js';

@Module({
  providers: [
    AiService,
    PromptBuilderService,
    OpenAiProvider,
    {
      provide: AI_PROVIDER,
      useExisting: OpenAiProvider,
    },
  ],
  exports: [AiService],
})
export class AiModule {}
