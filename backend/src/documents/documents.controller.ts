import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DocumentsService } from './documents.service.js';
import { StorageService } from '../storage/storage.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentType } from '@prisma/client';
import { diskStorage } from 'multer';

@Controller('shipments/:shipmentId/documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  findByShipment(@Param('shipmentId') shipmentId: string) {
    return this.documentsService.findByShipmentId(shipmentId);
  }

@Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 25 * 1024 * 1024,
      },
      fileFilter: (_request, file, callback) => {
        const allowedMimeTypes = new Set([
          'application/pdf',
          'image/png',
          'image/jpeg',
          'image/tiff',
          'text/plain',
        ]);

        if (!allowedMimeTypes.has(file.mimetype)) {
          callback(
            new BadRequestException(
              `Unsupported file type: ${file.mimetype}`,
            ),
            false,
          );
          return;
        }

        callback(null, true);
      },
    }),
  )
  async uploadDocument(
    @Param('shipmentId') shipmentId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: DocumentType,
  ) {
    if (!file) {
      throw new BadRequestException(
        'A document file is required',
      );
    }

    if (!Object.values(DocumentType).includes(type)) {
      throw new BadRequestException(
        `Invalid document type: ${type}`,
      );
    }

    const storedFile =
      await this.storageService.saveFile({
        buffer: file.buffer,
        originalFilename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        shipmentId,
      });

    try {
      return await this.documentsService.create(
        shipmentId,
        {
          type,
          filename: storedFile.originalFilename,
          storagePath: storedFile.key,
        },
      );
    } catch (error) {
      await this.storageService
        .deleteFile(storedFile.key)
        .catch(() => undefined);

      throw error;
    }
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