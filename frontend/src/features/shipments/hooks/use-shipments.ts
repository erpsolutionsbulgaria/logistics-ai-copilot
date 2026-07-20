import { useQuery } from "@tanstack/react-query";

import { getShipments } from "../api/shipments-api";
import { shipmentQueryKeys } from "../api/shipment-query-keys";

export function useShipments() {
  return useQuery({
    queryKey: shipmentQueryKeys.list(),
    queryFn: getShipments,
  });
}