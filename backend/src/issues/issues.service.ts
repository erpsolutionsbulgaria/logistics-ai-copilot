import { Injectable } from '@nestjs/common';
import type { Issue } from '@prisma/client';
import { IssueSeverity } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class IssuesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    shipmentId: string,
    severity: IssueSeverity,
    title: string,
    description: string,
  ): Promise<Issue> {
    return this.prismaService.issue.create({
      data: {
        shipmentId,
        severity,
        title,
        description,
      },
    });
  }

  findByShipment(shipmentId: string): Promise<Issue[]> {
    return this.prismaService.issue.findMany({
      where: {
        shipmentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
