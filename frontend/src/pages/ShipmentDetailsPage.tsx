import {
  AlertCircle,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShipmentStatusBadge from "@/features/shipments/components/ShipmentStatusBadge";
import { useShipment } from "@/features/shipments/hooks/use-shipment";

function ShipmentDetailsPage() {
  const navigate = useNavigate();
  const { shipmentId } = useParams();

  const shipmentQuery = useShipment(shipmentId);

  function handleBackToShipments() {
    navigate("/shipments");
  }

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
            <h1 className="font-semibold">
              Could not load shipment
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {shipmentQuery.error.message}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleBackToShipments}
          >
            Back to shipments
          </Button>
        </CardContent>
      </Card>
    );
  }

  const shipment = shipmentQuery.data;

  return (
    <section className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBackToShipments}
      >
        <ArrowLeft />
        Back to shipments
      </Button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {shipment.reference}
          </h1>

          <p className="mt-1 text-muted-foreground">
            Shipment details and extracted information
          </p>
        </div>

        <ShipmentStatusBadge
          status={shipment.status}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">
                Reference
              </dt>

              <dd className="mt-1 font-medium">
                {shipment.reference}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Status
              </dt>

              <dd className="mt-1">
                <ShipmentStatusBadge
                  status={shipment.status}
                />
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Created
              </dt>

              <dd className="mt-1 font-medium">
                {shipment.createdAt}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Updated
              </dt>

              {/* <dd className="mt-1 font-medium">
                {shipment.updatedAt}
              </dd> */}
            </div>
          </dl>
        </CardContent>
      </Card>
    </section>
  );
}

export default ShipmentDetailsPage;