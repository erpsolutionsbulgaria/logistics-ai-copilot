import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { DocumentsModule } from '../documents/documents.module';
import { IssuesModule } from '../issues/issues.module';

@Module({
  imports: [DocumentsModule, IssuesModule],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  exports: [ShipmentsService]
})
export class ShipmentsModule {}
