import { z } from "zod";

export const socialSchema = z.object({
  id: z.number().int().positive(),
  personalId: z.number().int(),
  social: z.string().max(50, { message: "Must be 50 characters or fewer" }),
  username: z.string().max(100, { message: "Must be 100 characters or fewer" }),
  url: z.string().url({ message: "Invalid url" }).max(255),
});

export const socialCreateSchema = socialSchema.omit({
  id: true,
});
