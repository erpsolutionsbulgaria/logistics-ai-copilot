import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ShipmentsService } from './shipments/shipments.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly shipmentsService: ShipmentsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('debug/memory')
  getMemory() {
    const memory = process.memoryUsage();

    return {
      rssMb: Math.round(memory.rss / 1024 / 1024),
      heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024),
      heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
      externalMb: Math.round(memory.external / 1024 / 1024),
    };
  }
}
