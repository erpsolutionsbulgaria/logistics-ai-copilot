export type ShipmentStatus =
  //  "CREATED" |
    "DRAFT" |
    "PROCESSING" |
    "REVIEW_REQUIRED" |
    "READY" |
    "COMPLETED";

export type TransportMode =
  | "ROAD"
  | "AIR"
  | "SEA"
  | "RAIL";

export type Shipment = {
  id: string;
  reference: string;
  clientName: string;
  origin: string;
  destination: string;
  transportMode: TransportMode | null;
  notes: string | null;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
};  

export type CreateShipmentInput = {
  reference: string;
  origin: string;
  destination: string;
  transportMode?: TransportMode;
  notes?: string;
};