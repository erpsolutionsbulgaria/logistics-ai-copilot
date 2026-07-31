import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShipment } from "../api/shipments-api";
import { shipmentQueryKeys } from "../api/shipment-query-keys";

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShipment,
     onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: shipmentQueryKeys.all,
      });
    },
   });
}