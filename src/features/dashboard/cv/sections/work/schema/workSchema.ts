import { z } from "zod";

const idSchema = z.number().int().positive();

export const workSchema = z.object({
  id: idSchema,
  cvId: idSchema,
  company: z
    .string()
    .max(100, { message: "Company name must be 100 characters or fewer" }),
  position: z
    .string()
    .max(100, { message: "Position must be 100 characters or fewer" }),
  startDate: z.coerce
    .date({ invalid_type_error: "Invalid start date format" })
    .optional(),
  endDate: z.coerce
    .date({ invalid_type_error: "Invalid end date format" })
    .optional(),
  url: z
    .string()
    .url({ message: "Please provide a valid URL" })
    .max(255, { message: "URL must be 255 characters or fewer" })
    .optional(),
  isCurrent: z.boolean().optional(),
  descriptions: z.array(z.string()).optional(),
  location: z
    .string()
    .max(100, { message: "Location must be 100 characters or fewer" })
    .optional(),
});

export const workCreateSchema = workSchema.omit({
  id: true,
  cvId: true,
});

export const workUpdateSchema = workCreateSchema.partial();
