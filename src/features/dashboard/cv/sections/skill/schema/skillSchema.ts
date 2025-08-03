import { z } from "zod";

const idSchema = z.number().int().positive();
export const skillSchema = z.object({
  id: idSchema,
  cvId: idSchema,
  category: z
    .string()
    .min(1, { message: "Category is required" })
    .max(255, { message: "Category must be 255 characters or fewer" }),
  skill: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" }),
});

export const skillCreateSchema = skillSchema.omit({
  id: true,
  cvId: true,
});

export const skillUpdateSchema = skillCreateSchema.partial();
