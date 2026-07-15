import { StorageUploadDto } from "../dto/storage-upload.dto";
import { StoredFileDto } from "../dto/stored-file.dto";

export interface StorageProvider {
  createReadUrl(key: string, expiresInSeconds: number | undefined): Promise<string>;
  deleteFile(key: string): Promise<void>;
  readFile(key: string): Promise<Buffer<ArrayBufferLike>>;
  saveFile(upload: StorageUploadDto): Promise<StoredFileDto>;
}
