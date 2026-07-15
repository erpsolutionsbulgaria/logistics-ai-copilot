import { Inject, Injectable } from '@nestjs/common';
import { OCR_PROVIDER } from '../ocr/providers/ocr-provider.token.js';
import * as ocrProviderInterface from './providers/ocr-provider.interface.js';

@Injectable()
export class OcrService {
  constructor(
    @Inject(OCR_PROVIDER)
    private readonly provider: ocrProviderInterface.OcrProvider,
  ) {}

  extractText(storagePath: string): Promise<string> {
    return this.provider.extractText(storagePath);
  }
}