import type { Shipment } from "../features/shipments/types/shipment";
import ShipmentCard from "./ShipmentCard";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type ShipmentListProps = {
  shipments: Shipment[];
};

function ShipmentList({ shipments }: ShipmentListProps) {
  if (shipments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h2 className="font-semibold">
            No shipments yet
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Uploaded shipments will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {shipments.map((shipment) => (
        <ShipmentCard
          key={shipment.id}
          shipment={shipment}
        />
      ))}
    </div>
  );
}

export default ShipmentList;