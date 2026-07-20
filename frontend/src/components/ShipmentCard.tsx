import { Link } from "react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShipmentStatusBadge from "@/features/shipments/components/ShipmentStatusBadge";
import type { Shipment } from "@/features/shipments/types/shipment";

type ShipmentCardProps = {
  shipment: Shipment;
};

function ShipmentCard({ shipment }: ShipmentCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              <Link
                to={`/shipments/${shipment.id}`}
                className="hover:underline"
              >
                {shipment.reference}
              </Link>
            </CardTitle>

            <CardDescription className="mt-1">
              Created {shipment.createdAt}
            </CardDescription>
          </div>

          <ShipmentStatusBadge status={shipment.status} />
        </div>
      </CardHeader>
    </Card>
  );
}

export default ShipmentCard;