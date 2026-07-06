import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ShipmentsModule } from './shipments/shipments.module.js';
import { DocumentsModule } from './documents/documents.module.js';
import { IssuesModule } from './issues/issues.module.js';
import { TasksModule } from './tasks/tasks.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AiModule } from './ai/ai.module.js';

@Module({
  imports: [ShipmentsModule, DocumentsModule, IssuesModule, TasksModule, PrismaModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
