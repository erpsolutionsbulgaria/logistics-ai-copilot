import { Badge } from "@/components/ui/badge";
import type { ShipmentStatus } from "@/features/shipments/types/shipment";

type ShipmentStatusBadgeProps = {
  status: ShipmentStatus;
};

const statusLabels: Record<ShipmentStatus, string> = {
  DRAFT: "Draft",
  PROCESSING: "Processing",
  REVIEW_REQUIRED: "Review required",
  READY: "Ready",
  COMPLETED: "Completed",
};

function ShipmentStatusBadge({
  status,
}: ShipmentStatusBadgeProps) {
  return (
    <Badge variant="secondary">
      {statusLabels[status]}
    </Badge>
  );
}

export default ShipmentStatusBadge;