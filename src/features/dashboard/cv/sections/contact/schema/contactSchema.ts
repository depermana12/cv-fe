import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().int().positive(),
  cvId: z.number().int().positive(),
  firstName: z
    .string()
    .max(100, { message: "First name must be 100 characters or fewer" })
    .optional(),
  lastName: z
    .string()
    .max(100, { message: "Last name must be 100 characters or fewer" })
    .optional(),
  bio: z
    .string()
    .max(255, { message: "Bio must be 255 characters or fewer" })
    .optional(),
  email: z
    .string()
    .email({ message: "Please provide a valid email address" })
    .max(255, { message: "Email must be 255 characters or fewer" })
    .optional(),
  phone: z
    .string()
    .max(20, { message: "Phone must be 20 characters or fewer" })
    .optional(),
  city: z
    .string()
    .max(100, { message: "City must be 100 characters or fewer" })
    .optional(),
  state: z
    .string()
    .max(100, { message: "State must be 100 characters or fewer" })
    .optional(),
  country: z
    .string()
    .max(100, { message: "Country must be 100 characters or fewer" })
    .optional(),
  website: z
    .string()
    .url({ message: "Please provide a valid website URL" })
    .max(255, { message: "Website must be 255 characters or fewer" })
    .optional(),
  linkedin: z
    .string()
    .max(255, { message: "LinkedIn must be 255 characters or fewer" })
    .optional(),
  github: z
    .string()
    .max(255, { message: "GitHub must be 255 characters or fewer" })
    .optional(),
  portfolio: z
    .string()
    .url({ message: "Please provide a valid portfolio URL" })
    .max(255, { message: "Portfolio must be 255 characters or fewer" })
    .optional(),
  summary: z
    .string()
    .max(1000, { message: "Summary must be 1000 characters or fewer" })
    .optional(),
  profileImage: z
    .string()
    .max(255, { message: "Profile image URL must be 255 characters or fewer" })
    .optional(),
  socialLinks: z
    .array(z.string().url({ message: "Each social link must be a valid URL" }))
    .optional(),
});

export const contactCreateSchema = contactSchema.omit({
  id: true,
  cvId: true,
});

export const contactUpdateSchema = contactCreateSchema.partial();
