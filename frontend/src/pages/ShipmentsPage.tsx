import { useShipments } from "@/features/shipments/hooks/use-shipments";
import ShipmentList from "../features/shipments/components/ShipmentList";
// import { shipments } from "../data/shipments";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateShipmentDialog from "@/features/shipments/components/details/CreateShipmentDialog";
import { useState } from "react";

function ShipmentsPage() {
  const shipmentsQuery = useShipments();
  const [isCreateShipmentDialogOpen, setIsCreateShipmentDialogOpen] = useState(false);

  if (shipmentsQuery.isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoaderCircle className="size-6 animate-spin" />

        <span className="ml-2 text-sm text-muted-foreground">
          Loading shipments...
        </span>
      </div>
    );
  }

  if (shipmentsQuery.isError) {
    console.log('>>>> ', shipmentsQuery)
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <AlertCircle className="size-8 text-destructive" />

          <div className="text-center">
            <h2 className="font-semibold">
              Could not load shipments
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {shipmentsQuery.error.message}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => shipmentsQuery.refetch()}
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            Shipments
          </h1>

          <Button
            variant="outline"
            onClick={() => setIsCreateShipmentDialogOpen(true)}
          >
            Create
          </Button>

          <CreateShipmentDialog
            open={isCreateShipmentDialogOpen}
            onOpenChange={setIsCreateShipmentDialogOpen}
          />
              
        </div>

        <p className="mt-1 text-muted-foreground">
          Review and manage processed shipment documents.
        </p>
      </div>

      <ShipmentList shipments={shipmentsQuery.data} />
    </section>
  );
}

export default ShipmentsPage;