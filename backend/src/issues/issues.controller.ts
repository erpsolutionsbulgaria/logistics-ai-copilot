import { Controller, Get, Param } from '@nestjs/common';
import { IssuesService } from './issues.service.js';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService,
  ) {}

  @Get(':shipmentId')
  findByShipment(
    @Param('shipmentId') shipmentId: string,
  ) {
    return this.issuesService.findByShipment(
      shipmentId,
    );
  }
}
