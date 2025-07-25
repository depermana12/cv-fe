import { z } from "zod";

export const languageSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  language: z
    .string()
    .max(100, { message: "Language must be 100 characters or fewer" }),
  fluency: z
    .enum(["beginner", "intermediate", "advanced"], {
      message: "Please select a valid fluency level",
    })
    .optional(),
});

export const languageInsertSchema = languageSchema.omit({
  id: true,
  cvId: true,
});

export const languageUpdateSchema = languageSchema.partial();
