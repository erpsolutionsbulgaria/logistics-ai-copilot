import { ExtractionRequestDto } from '../dto/extraction-request.dto.js';
import { ExtractionResultDto } from '../dto/extraction-result.dto.js';

export interface AiProvider {
  extractStructuredData(request: ExtractionRequestDto): Promise<ExtractionResultDto>;
}