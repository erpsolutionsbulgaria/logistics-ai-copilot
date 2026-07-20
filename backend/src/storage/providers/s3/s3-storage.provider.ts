import { readdirSync, readFileSync } from 'fs';
import { StorageProvider } from '../storage-provider.interface';
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  ListObjectsCommand,
  CopyObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { unlink } from 'node:fs/promises';
import {
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StorageUploadDto } from 'src/storage/dto/storage-upload.dto';
import { StoredFileDto } from 'src/storage/dto/stored-file.dto';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

export class S3StorageProvider implements StorageProvider {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_S3_BUCKET_NAME;

    if (!region) {
      throw new Error('AWS_REGION is not configured');
    }

    if (!bucket) {
      throw new Error('AWS_S3_BUCKET_NAME is not configured');
    }

    this.bucket = bucket;
    this.client = new S3Client({ region });
  }

  // Implementation for S3 storage provider
  async saveFile(upload: StorageUploadDto): Promise<StoredFileDto> {
    const extension = extname(upload.originalFilename).toLowerCase();

    const key = [
      'shipment',
      upload.shipmentId,
      'documents',
      `${randomUUID()}${extension}`,
    ].join('/');

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: upload.buffer,
          ContentType: upload.mimeType,
          ContentLength: upload.size,

          ServerSideEncryption: 'AES256',

          Metadata: {
            originalFilename: encodeURIComponent(upload.originalFilename),
          },
        }),
      );

      return {
        key,
        originalFilename: upload.originalFilename,
        mimeType: upload.mimeType,
        size: upload.size,
      };
    } catch (error) {
      throw new BadGatewayException('The document could not be stored in S3', {
        cause: error,
      });
    }
  }

  async readFile(key: string): Promise<Buffer> {
    try {
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      if (!response.Body) {
        throw new Error(`S3 object ${key} has no body`);
      }

      const bytes = await response.Body.transformToByteArray();

      return Buffer.from(bytes);
    } catch (error) {
      throw new BadGatewayException(
        `The stored document ${key} could not be read`,
        { cause: error },
      );
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    } catch (error) {
      throw new BadGatewayException(
        `The stored document ${key} could not be deleted`,
        { cause: error },
      );
    }
  }

  async createReadUrl(key: string, expiresInSeconds = 300): Promise<string> {
    if (expiresInSeconds <= 0 || expiresInSeconds > 3600) {
      throw new InternalServerErrorException(
        'Invalid presigned URL expiration',
      );
    }

    try {
      return await getSignedUrl(
        this.client,
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
        {
          expiresIn: expiresInSeconds,
        },
      );
    } catch (error) {
      throw new BadGatewayException(
        `A temporary URL for ${key} could not be generated`,
        { cause: error },
      );
    }
  }
}
