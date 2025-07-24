import { z } from "zod";

export const educationSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  institution: z
    .string()
    .max(100, { message: "Must be 100 characters or fewer" }),
  degree: z.enum(
    ["high_school", "diploma", "bachelor", "master", "doctorate"],
    {
      message: "Please select a valid degree type",
    },
  ),
  fieldOfStudy: z
    .string()
    .max(100, { message: "Field of study must be 100 characters or fewer" })
    .optional(),
  startDate: z.coerce
    .date({ invalid_type_error: "Invalid start date format" })
    .optional(),
  endDate: z.coerce
    .date({ invalid_type_error: "Invalid end date format" })
    .optional(),
  gpa: z
    .string()
    .regex(/^\d{1,1}(\.\d{1,2})?$/, {
      message: "GPA must be a decimal with up to 2 decimal places",
    })
    .optional(),
  url: z
    .string()
    .url({ message: "Please provide a valid URL" })
    .max(255, { message: "URL must be 255 characters or fewer" })
    .optional(),
  location: z
    .string()
    .max(100, { message: "Location must be 100 characters or fewer" })
    .optional(),
  description: z.array(z.string()).optional(),
});

export const educationCreateSchema = educationSchema.omit({
  id: true,
  cvId: true,
});

export const educationUpdateSchema = educationCreateSchema.partial();
