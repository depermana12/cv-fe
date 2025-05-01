import { z } from "zod";

export const personalCreateSchema = z.object({
  userId: z.number().int().positive(),
  fullName: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(100),
  bio: z
    .string()
    .max(255, { message: "Must be 255 characters or fewer" })
    .optional(),
  image: z.string().max(255, { message: "Must be 255 characters or fewer" }),
  summary: z.string(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  email: z.string().email({ message: "Invalid email address" }),
  url: z.string().url({ message: "Invalid url" }),
});

export const personalSelectSchema = personalCreateSchema.extend({
  id: z.number().int().positive(),
  createdAt: z.string().datetime(),
});
