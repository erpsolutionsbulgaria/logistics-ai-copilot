import { z } from "zod";

export const createShipmentSchema = z.object({
  reference: z
    .string()
    .trim()
    .min(1, "Reference is required")
    .max(100, "Reference must be at most 100 characters"),
});

export type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;