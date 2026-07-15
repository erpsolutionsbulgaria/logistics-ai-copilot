export interface OcrProvider {
  extractText(storagePath: string): Promise<string>;
}