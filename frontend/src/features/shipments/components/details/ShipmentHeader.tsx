import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import ShipmentStatusBadge from "../ShipmentStatusBadge";

import type { Shipment } from "../../types/shipment";

type Props = {
  shipment: Shipment;
};

function ShipmentHeader({ shipment }: Props) {
  const navigate = useNavigate();

  return (
    <header className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/shipments")}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            {shipment.reference}
          </h1>

          <p className="mt-1 text-muted-foreground">
            Shipment details
          </p>
        </div>

        <ShipmentStatusBadge status={shipment.status} />
      </div>
    </header>
  );
}

export default ShipmentHeader;