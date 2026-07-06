import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller.js';
import { DocumentsService } from './documents.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AiModule } from '../ai/ai.module.js';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
  imports: [PrismaModule, AiModule]
})
export class DocumentsModule {}
