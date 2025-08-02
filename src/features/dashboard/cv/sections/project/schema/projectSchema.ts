import { z } from "zod";

const idSchema = z.number().int().positive();

export const projectSchema = z.object({
  id: idSchema,
  cvId: idSchema,
  name: z
    .string()
    .max(100, { message: "Project name must be 100 characters or fewer" }),
  startDate: z.coerce
    .date({ invalid_type_error: "Invalid start date format" })
    .optional(),
  endDate: z.coerce
    .date({ invalid_type_error: "Invalid end date format" })
    .optional(),
  url: z
    .union([
      z.literal(""),
      z.string().url({ message: "Please provide a valid URL" }),
    ])
    .optional(),
  descriptions: z.array(z.string()).optional(),
});

export const projectCreateSchema = projectSchema.omit({
  id: true,
  cvId: true,
});

export const projectUpdateSchema = projectCreateSchema.partial();
