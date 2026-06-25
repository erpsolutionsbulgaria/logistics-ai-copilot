import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    console.log('CONTROLLER >>>>>>> ', createShipmentDto);
    return this.shipmentsService.create(createShipmentDto);
  }

  @Post(':shipmentId/validate')
  validate(
    @Param('shipmentId') shipmentId: string,
  ) {
     return this.shipmentsService.validate(shipmentId);
  }
}