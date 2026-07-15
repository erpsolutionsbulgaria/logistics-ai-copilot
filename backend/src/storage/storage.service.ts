import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_PROVIDER } from '../storage/providers/storage-provider.token.js';
import * as storageProviderInterface from './providers/storage-provider.interface.js';
import { StorageUploadDto } from './dto/storage-upload.dto.js';
import { StoredFileDto } from './dto/stored-file.dto.js';

@Injectable()
export class StorageService {

  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: storageProviderInterface.StorageProvider,
  ){
  }

  async saveFile(upload: StorageUploadDto): Promise<StoredFileDto> {
    return this.storageProvider.saveFile(upload);
  }

  readFile(key: string): Promise<Buffer> {
    return this.storageProvider.readFile(key);
  }

  deleteFile(key: string): Promise<void> {
    return this.storageProvider.deleteFile(key);
  }

  // createReadUrl(key: string, expiresInSeconds?: number): Promise<string> {
  //   return this.storageProvider.createReadUrl(key, expiresInSeconds);
  // }
}
