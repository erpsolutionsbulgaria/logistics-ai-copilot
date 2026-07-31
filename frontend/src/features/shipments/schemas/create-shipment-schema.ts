import { z } from "zod";

export const createShipmentSchema = z.object({
  reference: z.string().min(1),
  clientName: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  transportMode: z.enum(["ROAD", "AIR", "SEA", "RAIL"]).optional(),
  notes: z.string().optional(),
});

export type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;