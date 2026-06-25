import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Issue } from './entities/issue.entity';
import { IssueSeverity } from './enums/issue-severity.entity';

@Injectable()
export class IssuesService {
  private issues: Issue[] = [
      {
        id: randomUUID(),
        shipmentId: randomUUID(),
        title: 'Issue 1',
        severity: IssueSeverity.LOW,
        description: 'This is a low severity issue',
      },
    ];  

  create(
    shipmentId: string,
    severity: IssueSeverity,
    title: string,
    description: string,
  ): Issue {
    const issue: Issue = {
      id: randomUUID(),
      shipmentId,
      severity,
      title,
      description,
    };

    this.issues.push(issue);

    return issue;
  }

  findByShipment(shipmentId: string): Issue | undefined {
    const issue = this.issues.find(
      issue => issue.shipmentId === shipmentId,
    );
    return issue;
  }
}
