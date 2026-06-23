import { ShipmentStatus } from '../enums/shipment-status.enum';

export class Shipment {
  id!: string;
  reference!: string;
  clientName!: string;
  status!: ShipmentStatus;
}