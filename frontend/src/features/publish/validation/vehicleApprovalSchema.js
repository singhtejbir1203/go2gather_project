import { z } from "zod";

export const vehicleApprovalSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  plateNumber: z.string().min(4, "Plate number is required"),
  license: z
    // .file()
    // .min(1, "License is required")
    // .max(1, "Only one file Allowed"),
    .any()
    .refine((file) => file instanceof File, "License is required"),
});
