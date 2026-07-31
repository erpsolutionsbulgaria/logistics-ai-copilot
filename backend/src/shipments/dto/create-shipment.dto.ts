import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ShipmentStatus, TransportMode } from '@prisma/client';

export class CreateShipmentDto {
  // @IsString()
  // id!: string;

  @IsString()
  reference!: string;

  @IsString()
  @MinLength(1)
  origin!: string;

  @IsString()
  @MinLength(1)
  destination!: string;

  @IsOptional()
  @IsEnum(TransportMode)
  transportMode?: TransportMode;

  @IsOptional()
  @IsString()
  notes?: string;
  
  @IsString()
  clientName!: string;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;
}