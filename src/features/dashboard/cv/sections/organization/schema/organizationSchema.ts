import { z } from "zod";

export const organizationSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  organization: z
    .string()
    .max(100, { message: "Organization name must be 100 characters or fewer" }),
  role: z
    .string()
    .max(100, { message: "Role must be 100 characters or fewer" }),
  startDate: z.coerce
    .date({ invalid_type_error: "Invalid start date format" })
    .optional(),
  endDate: z.coerce
    .date({ invalid_type_error: "Invalid end date format" })
    .optional(),
  descriptions: z.array(z.string()).optional(),
  location: z
    .string()
    .max(100, { message: "Location must be 100 characters or fewer" })
    .optional(),
});

export const organizationCreateSchema = organizationSchema.omit({
  id: true,
  cvId: true,
});

export const organizationUpdateSchema = organizationCreateSchema.partial();
