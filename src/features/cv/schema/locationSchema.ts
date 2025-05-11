import { z } from "zod";

export const locationSchema = z.object({
  id: z.number().int().positive(),
  personalId: z.number().int(),
  address: z
    .string()
    .max(255, { message: "Must be fewer than 255 characters" }),
  postalCode: z.string().length(5, { message: "Must be exactly 5 characters" }),
  city: z.string().max(100, { message: "Must be 100 characters or fewer" }),
  countryCode: z.string().max(3, { message: "Must be 3 characters or fewer" }),
  state: z.string().max(100, { message: "Must be 100 characters or fewer" }),
});

export const locationCreateSchema = locationSchema.omit({
  id: true,
});
