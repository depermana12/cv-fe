import { z } from "zod";

const idSchema = z.number().int().positive();
export const skillSchema = z.object({
  id: idSchema,
  cvId: idSchema,
  type: z.enum(["technical", "soft", "language", "tool"], {
    message: "Please select a valid skill type",
  }),
  category: z
    .string()
    .max(100, { message: "Category must be 100 characters or fewer" }),
  name: z
    .string()
    .max(100, { message: "Skill name must be 100 characters or fewer" }),
  proficiency: z
    .enum(["beginner", "intermediate", "advanced", "expert"], {
      message: "Please select a valid proficiency level",
    })
    .optional(),
  keywords: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export const skillCreateSchema = skillSchema.omit({
  id: true,
  cvId: true,
});

export const skillUpdateSchema = skillCreateSchema.partial();
