import { Prompt } from '../prompt/prompt.interface.js';
import { InvoiceExtractionData } from '../schemas/invoice-extraction.schema.js';

export interface AiProvider {
  extractStructuredData(prompt: Prompt): Promise<InvoiceExtractionData>;
}
