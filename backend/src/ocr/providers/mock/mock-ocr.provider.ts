import {
  BadGatewayException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { extname } from 'path';
import { OcrProvider } from '../ocr-provider.interface.js';
import { Mistral } from '@mistralai/mistralai';
import { StorageService } from '../../../../src/storage/storage.service.js';

@Injectable()
export class MockOcrProvider implements OcrProvider {
  private readonly client: Mistral;

  constructor(private readonly storageService: StorageService) {
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY is not configured');
    }

    this.client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
  }

  async extractText(storagePath: string): Promise<string> {
    try {
      const fileUrl = await this.storageService.createReadUrl(
        storagePath,
        60 * 5,
      ); // Create a temporary URL valid for 5 minutes
      const ocrResponse = await this.client.ocr.process({
        model: 'mistral-ocr-latest',
        document: {
          type: 'document_url',
          documentUrl: fileUrl,
        },
      });

      const markdown = ocrResponse.pages
        .map((page) => page.markdown?.trim() ?? '')
        .filter(Boolean)
        .join('\n\n')
        .trim();

      if (!markdown) {
        throw new UnprocessableEntityException(
          'OCR completed, but no text was extracted',
        );
      }

      return markdown;
    } catch (err) {
      if (err instanceof UnprocessableEntityException) {
        throw err;
      }

      throw new BadGatewayException(
        'Mistral OCR could not process the document',
        { cause: err },
      );
    }
  }
}
