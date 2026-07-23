import { useQuery } from "@tanstack/react-query";

import { getShipment } from "../api/shipments-api";
import { shipmentQueryKeys } from "../api/shipment-query-keys";

export function useCreateShipment() {
    useQuery({
        queryKey:
        
    })
//   return useQuery({
//     queryKey: shipmentQueryKeys.detail(
//       shipmentId ?? "",
//     ),

//     queryFn: () => {
//       if (!shipmentId) {
//         throw new Error("Shipment ID is required");
//       }

//       return getShipment(shipmentId);
//     },

//     enabled: Boolean(shipmentId),
//   });
}