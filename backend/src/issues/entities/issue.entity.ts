import { IssueSeverity } from '../enums/issue-severity.entity';

export class Issue {
  id!: string;
  shipmentId!: string;
  title!: string;
  severity!: IssueSeverity;
  description!: string;
}
