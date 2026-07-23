import { apiClient } from "@/lib/api-client";

import type {
    CreateShipmentInput,
    Shipment
} from "../types/shipment";

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

export function createShipment(
  input: CreateShipmentInput,
): Promise<Shipment> {
  return apiClient<Shipment>("/shipments", {
    method: "POST",
    body: input,
  });
}