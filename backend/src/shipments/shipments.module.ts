import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller.js';
import { ShipmentsService } from './shipments.service.js';
import { DocumentsModule } from '../documents/documents.module.js';
import { IssuesModule } from '../issues/issues.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [DocumentsModule, IssuesModule, PrismaModule],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
