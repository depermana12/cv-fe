import { z } from "zod";

export const skillSchema = z.object({
  id: z.number().int().positive(),
  personalId: z.number().int().positive(),
  category: z.string().max(50, { message: "Must be 50 characters or fewer" }),
  name: z.string().max(100, { message: "Must be 100 characters or fewer" }),
});

export const skillCreateSchema = skillSchema.omit({
  id: true,
});
