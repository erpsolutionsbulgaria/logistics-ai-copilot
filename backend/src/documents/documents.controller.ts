import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentsService } from './documents.service';

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
}