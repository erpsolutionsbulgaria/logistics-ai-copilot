import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ShipmentStatus } from '../enums/shipment-status.enum.js';

export class CreateShipmentDto {
  // @IsString()
  // id!: string;

  @IsString()
  reference!: string;

  @IsString()
  clientName!: string;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;
}