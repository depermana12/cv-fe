import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }).max(100),
  isEmailVerified: z.boolean().optional(),
  profileImage: z.string().url({ message: "Invalid image URL" }).optional(),
  birthDate: z.coerce
    .date({ invalid_type_error: "Invalid birth date" })
    .optional(),
  firstName: z
    .string()
    .max(50, { message: "First name must be 50 characters or fewer" })
    .optional(),
  lastName: z
    .string()
    .max(50, { message: "Last name must be 50 characters or fewer" })
    .optional(),
  gender: z.enum(["male", "female"]).optional(),
  about: z
    .string()
    .max(1000, { message: "About section must be 1000 characters or fewer" })
    .optional(),
  bio: z
    .string()
    .max(255, { message: "Bio must be 255 characters or fewer" })
    .optional(),
  emailNotifications: z
    .boolean({ message: "Email notifications must be true or false" })
    .optional(),
  monthlyReports: z
    .boolean({ message: "Monthly reports must be true or false" })
    .optional(),
  subscriptionType: z
    .enum(["free", "trial", "pro"], {
      message: "Please select a valid subscription type",
    })
    .optional(),
  subscriptionStatus: z
    .enum(["active", "expired", "cancelled", "pending"], {
      message: "Please select a valid subscription status",
    })
    .optional(),
  subscriptionExpiresAt: z.coerce
    .date({ invalid_type_error: "Invalid subscription expiry date format" })
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userInsertSchema = userSchema.omit({
  id: true,
  isEmailVerified: true,
  createdAt: true,
  updatedAt: true,
  emailNotifications: true,
  monthlyReports: true,
  subscriptionType: true,
  subscriptionStatus: true,
  subscriptionExpiresAt: true,
});

export const userUpdateSchema = userSchema
  .pick({
    profileImage: true,
    birthDate: true,
    firstName: true,
    lastName: true,
    gender: true,
    about: true,
    bio: true,
  })
  .partial();

export const userCredentialsUpdateSchema = userSchema
  .pick({
    username: true,
    email: true,
  })
  .partial();

export const userPreferencesUpdateSchema = userSchema
  .pick({
    emailNotifications: true,
    monthlyReports: true,
  })
  .partial();

export const userStats = z.object({
  user: userSchema,
  accountAge: z.number().describe("Account age in days"),
  isEmailVerified: z.boolean().describe("Email verification status"),
  cvCreated: z.number().describe("Number of CVs created by the user"),
  totalJobApplications: z
    .number()
    .describe("Total job applications made by the user")
    .optional(),
});

export const checkUsernameSchema = z.object({
  username: z.string().min(1, "Username must be at least 1 character"),
  available: z.boolean().describe("Indicates if the username is available"),
  exists: z.boolean().describe("Indicates if the username already exists"),
});
