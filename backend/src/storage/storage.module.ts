import { Module } from '@nestjs/common';
import { StorageService } from './storage.service.js';
import { STORAGE_PROVIDER } from './providers/storage-provider.token.js';
import { S3StorageProvider } from './providers/s3/s3-storage.provider.js';

@Module({
  providers: [
    StorageService,
    S3StorageProvider,
    {
      provide: STORAGE_PROVIDER,
      useExisting: S3StorageProvider,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
