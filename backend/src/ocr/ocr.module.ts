import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service.js';
import { MockOcrProvider } from '../ocr/providers/mock/mock-ocr.provider.js';
import { OCR_PROVIDER } from './providers/ocr-provider.token.js';

@Module({
  providers: [
    OcrService,
    MockOcrProvider,
    {
      provide: OCR_PROVIDER,
      useExisting: MockOcrProvider
    }
  ],
  exports: [OcrService],
})
export class OcrModule {}