import { z } from "zod";

export const courseSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  provider: z
    .string()
    .max(100, { message: "Provider must be 100 characters or fewer" }),
  courseName: z
    .string()
    .max(200, { message: "Course name must be 200 characters or fewer" })
    .optional(),
  startDate: z.coerce
    .date({ invalid_type_error: "Invalid start date format" })
    .optional(),
  endDate: z.coerce
    .date({ invalid_type_error: "Invalid end date format" })
    .optional(),
  descriptions: z.array(z.string()).optional(),
});

export const courseInsertSchema = courseSchema.omit({
  id: true,
  cvId: true,
});

export const courseUpdateSchema = courseSchema.partial();
