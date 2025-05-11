import { z } from "zod";

export const softSkillSchema = z.object({
  id: z.number().int().positive(),
  personalId: z.number().int().positive(),
  category: z.string().max(50, { message: "Must be 50 characters or fewer" }),
  description: z.string(),
});

export const softSkillCreateSchema = softSkillSchema.omit({
  id: true,
});
