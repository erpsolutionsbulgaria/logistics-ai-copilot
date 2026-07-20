export type ShipmentStatus =
  //  "CREATED" |
    "DRAFT" |
    "PROCESSING" |
    "REVIEW_REQUIRED" |
    "READY" |
    "COMPLETED";

export type Shipment = {
  id: string;
  reference: string;
  clientName: string;
  status: ShipmentStatus;
  createdAt: string;
};  