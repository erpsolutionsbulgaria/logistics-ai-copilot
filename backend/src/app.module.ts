import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentsModule } from './shipments/shipments.module';
import { DocumentsModule } from './documents/documents.module';
import { IssuesModule } from './issues/issues.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ShipmentsModule, DocumentsModule, IssuesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
