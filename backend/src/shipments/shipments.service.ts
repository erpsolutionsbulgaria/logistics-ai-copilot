import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentStatus } from './enums/shipment-status.enum';
import { randomUUID } from 'crypto';
import { Shipment } from './entities/shipment.entity';

@Injectable()
export class ShipmentsService {
  private shipments: Shipment[] = [
    {
      id: randomUUID(),
      reference: 'SHP-001',
      clientName: 'Acme Logistics',
      status: ShipmentStatus.DRAFT,
    },
  ];

  findAll(): Shipment[] {
    return this.shipments;
  }

  findOne(id: string): Shipment | undefined {
    const shipment = this.shipments.find(
      shipment => shipment.id === id,
    );

    if (!shipment) {
      throw new NotFoundException(
        `Shipment ${id} not found`,
      );
    }

    return shipment;
  }

  create(createShipmentDto: CreateShipmentDto): Shipment {
    const shipment: Shipment = {
      id: randomUUID(),

      ...createShipmentDto,
      status: createShipmentDto.status ?? ShipmentStatus.DRAFT,
    };

    this.shipments.push(shipment);

    return shipment;
  }
}