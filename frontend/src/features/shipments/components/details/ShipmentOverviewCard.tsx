import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Shipment } from "../../types/shipment";

type Props = {
  shipment: Shipment;
};

function ShipmentOverviewCard({ shipment }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="text-sm text-muted-foreground">
            Reference
          </div>

          <div className="font-medium">
            {shipment.reference}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">
            Created
          </div>

          <div className="font-medium">
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(shipment.createdAt))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShipmentOverviewCard;