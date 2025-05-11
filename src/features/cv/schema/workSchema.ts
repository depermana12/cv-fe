import { z } from "zod";

export const workSchema = z.object({
  id: z.number().int().positive(),
  personalId: z.number().int().positive(),
  company: z.string().max(100, { message: "Must be 100 characters or fewer" }),
  position: z.string().max(100, { message: "Must be 100 characters or fewer" }),
  startDate: z.coerce.date({ invalid_type_error: "Invalid start date" }),
  endDate: z.coerce.date({ invalid_type_error: "Invalid end date" }),
  url: z.string().url({ message: "Invalid URL format" }),
  isCurrent: z.boolean(),
});

export const workCreateSchema = workSchema.omit({
  id: true,
});
