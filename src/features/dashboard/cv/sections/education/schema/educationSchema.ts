import { z } from "zod";

export const educationSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  institution: z
    .string({ required_error: "Institution is required" })
    .min(1, { message: "Institution is required" })
    .max(100, { message: "Institution must be 100 characters or fewer" }),
  degree: z.enum(
    ["high_school", "diploma", "bachelor", "master", "doctorate"],
    {
      message: "Please select a valid degree type",
    },
  ),
  fieldOfStudy: z
    .string({ required_error: "Field of study is required" })
    .min(1, { message: "Field of study is required" })
    .max(100, { message: "Field of study must be 100 characters or fewer" }),
  startDate: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date format",
  }),
  endDate: z.coerce
    .date({ invalid_type_error: "Invalid end date format" })
    .optional(),
  gpa: z
    .string()
    .regex(/^\d{1,1}(\.\d{1,2})?$/, {
      message: "GPA must be a decimal with up to 2 decimal places",
    })
    .optional(),
  location: z
    .string({ required_error: "Location is required" })
    .min(1, { message: "Location is required" })
    .max(100, { message: "Location must be 100 characters or fewer" }),
  description: z
    .string()
    .max(1000, { message: "Description must be 1000 characters or fewer" })
    .optional(),
});

export const educationCreateSchema = educationSchema.omit({
  id: true,
  cvId: true,
});

export const educationUpdateSchema = educationCreateSchema.partial();
