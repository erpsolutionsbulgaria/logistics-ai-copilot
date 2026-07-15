import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { extname } from 'path';
import { OcrProvider } from '../ocr-provider.interface.js';

@Injectable()
export class MockOcrProvider implements OcrProvider {
  async extractText(storagePath: string): Promise<string> {
    const extension = extname(storagePath).toLowerCase();

    if (extension === '.txt') {
      return readFile(storagePath, 'utf-8');
    }

    throw new Error(`Unsupported document type: ${extension}`);
  }
}