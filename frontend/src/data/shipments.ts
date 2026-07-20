import type { Shipment } from "../features/shipments/types/shipment";

export const shipments: Shipment[] = [
  {
    id: "1",
    reference: "SHP-2026-001",
    clientName: "MSC Maersk Line",
    status: "DRAFT",
    createdAt: "2026-07-16",
  },
  {
    id: "2",
    reference: "SHP-2026-002",
    clientName: "MSC Maersk Line 2",
    status: "PROCESSING",
    createdAt: "2026-07-15",
  },
  {
    id: "3",
    reference: "SHP-2026-003",
    clientName: "MSC Maersk Line 3",
    status: "COMPLETED",
    createdAt: "2026-07-14",
  },
];