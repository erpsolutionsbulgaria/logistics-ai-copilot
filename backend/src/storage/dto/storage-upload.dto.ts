export interface StorageUploadDto {
  buffer: Buffer;
  originalFilename: string;
  mimeType: string;
  size: number;
  shipmentId: string;
}
