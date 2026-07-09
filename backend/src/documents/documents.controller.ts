import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DocumentsService } from './documents.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('shipments/:shipmentId/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findByShipment(@Param('shipmentId') shipmentId: string) {
    return this.documentsService.findByShipmentId(shipmentId);
  }

  // @Post()
  // create(
  //   @Param('shipmentId') shipmentId: string,
  //   @Body() createDocumentDto: CreateDocumentDto,
  // ) {
  //   return this.documentsService.create(shipmentId, createDocumentDto);
  // }

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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadDocument(
    @Param('shipmentId') shipmentId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: string,
  ) {
    console.log('Document type:', type);
    console.log('FFile:', file);
    console.log('shipmentId:', shipmentId);
    return this.documentsService.create(shipmentId, {
      type: type as any,
      filename: file.originalname,
      storagePath: file.path,
    });
  }
}