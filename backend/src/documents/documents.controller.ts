import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DocumentsService } from './documents.service.js';

@Controller('shipments/:shipmentId/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findByShipment(@Param('shipmentId') shipmentId: string) {
    return this.documentsService.findByShipmentId(shipmentId);
  }

  @Post()
  create(
    @Param('shipmentId') shipmentId: string,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentsService.create(shipmentId, createDocumentDto);
  }

  @Post(':documentId/process')
  process(
    @Param('shipmentId') shipmentId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.documentsService.process(shipmentId, documentId);
  }

  @Get(':documentId/extraction')
  getExtractionResult(
    @Param('documentId') documentId: string,
    @Param('shipmentId') shipmentId: string,
  ) {
    return this.documentsService.getExtractionResult(shipmentId, documentId);
  }
}