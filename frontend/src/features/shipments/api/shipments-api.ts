import { apiClient } from "@/lib/api-client";

import type { Shipment } from "../types/shipment";

export function getShipments(): Promise<Shipment[]> {
  return apiClient<Shipment[]>("/shipments");
}

export function getShipment(
  shipmentId: string,
): Promise<Shipment> {
  return apiClient<Shipment>(
    `/shipments/${encodeURIComponent(shipmentId)}`,
  );
}