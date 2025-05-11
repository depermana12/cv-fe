import { z } from "zod";

export const projectSchema = z.object({
  id: z.number().int().positive(),
  personalId: z.number().int().positive(),
  name: z.string().max(100, { message: "Must be 100 characters or fewer" }),
  startDate: z.coerce.date({ invalid_type_error: "Invalid start date" }),
  endDate: z.coerce.date({ invalid_type_error: "Invalid end date" }),
  url: z.string().url({ message: "Invalid URL format" }),
});

export const projectCreateSchema = projectSchema.omit({
  id: true,
});

export const projectDescSchema = z.object({
  id: z.number().int().positive(),
  projectId: z.number().int().positive(),
  description: z.string(),
});

export const projectDescCreateSchema = projectDescSchema.omit({
  id: true,
});
