import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be 100 characters or fewer" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name must be 100 characters or fewer" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please provide a valid email address" })
    .max(255, { message: "Email must be 255 characters or fewer" }),
  phone: z
    .string()
    .max(20, { message: "Phone must be 20 characters or fewer" })
    .optional(),
  city: z
    .string({ required_error: "City is required" })
    .max(100, { message: "City must be 100 characters or fewer" })
    .optional(),
  country: z
    .string()
    .max(100, { message: "Country must be 100 characters or fewer" })
    .optional(),
  website: z
    .union([
      z.literal(""),
      z
        .string()
        .url({ message: "Please provide a valid website URL" })
        .max(255, { message: "Website must be 255 characters or fewer" }),
    ])
    .optional(),
  linkedin: z
    .union([
      z.literal(""),
      z
        .string()
        .url({ message: "Please provide a valid LinkedIn URL" })
        .max(255, { message: "LinkedIn must be 255 characters or fewer" }),
    ])
    .optional(),
  summary: z
    .string({ required_error: "Summary is required" })
    .min(1, { message: "Summary is required" })
    .max(1000, { message: "Summary must be 1000 characters or fewer" }),
  profileImage: z
    .string()
    .max(255, { message: "Profile image URL must be 255 characters or fewer" })
    .optional(),
});

export const contactCreateSchema = contactSchema.omit({
  id: true,
  cvId: true,
});

export const contactUpdateSchema = contactCreateSchema.partial();
