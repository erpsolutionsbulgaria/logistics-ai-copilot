import { useParams } from "react-router";

import ShipmentHeader from "@/features/shipments/components/details/ShipmentHeader";
import ShipmentOverviewCard from "@/features/shipments/components/details/ShipmentOverviewCard";
import { useShipment } from "@/features/shipments/hooks/use-shipment";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ShipmentDetailsPage() {
  const { shipmentId } = useParams();

  const shipmentQuery = useShipment(shipmentId);

  if (shipmentQuery.isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoaderCircle className="size-6 animate-spin" />

        <span className="ml-2 text-sm text-muted-foreground">
          Loading shipment...
        </span>
      </div>
    );
  }

  if (shipmentQuery.isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <AlertCircle className="size-8 text-destructive" />

          <div className="text-center">
            <h2 className="font-semibold">
              Could not load shipment
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {shipmentQuery.error.message}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => shipmentQuery.refetch()}
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const shipment = shipmentQuery.data;

  return (
    <section className="space-y-8">
      {shipment && <ShipmentHeader shipment={shipment} />}

      {shipment && <ShipmentOverviewCard shipment={shipment} />}
    </section>
  );
}

export default ShipmentDetailsPage;