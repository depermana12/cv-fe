import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }).max(100),
  isEmailVerified: z.boolean().optional(),
  profileImage: z
    .string()
    .url({ message: "Invalid image URL" })
    .optional()
    .nullable(),
  birthDate: z.coerce
    .date({ invalid_type_error: "Invalid birth date" })
    .optional()
    .nullable(),
  firstName: z
    .string()
    .max(50, { message: "First name must be 50 characters or fewer" })
    .optional()
    .nullable(),
  lastName: z
    .string()
    .max(50, { message: "Last name must be 50 characters or fewer" })
    .optional()
    .nullable(),
  gender: z.enum(["male", "female"]).optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userInsertSchema = userSchema.omit({
  id: true,
  isEmailVerified: true,
  createdAt: true,
  updatedAt: true,
});

export const userUpdateSchema = userSchema
  .pick({
    profileImage: true,
    birthDate: true,
    firstName: true,
    lastName: true,
    gender: true,
  })
  .partial();

export const userCredentialsUpdateSchema = userSchema
  .pick({
    username: true,
    email: true,
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

export type User = z.infer<typeof userSchema>;
export type UserStats = z.infer<typeof userStats>;
export type UserCreate = z.infer<typeof userInsertSchema>;
export type UserUpdateProfile = z.infer<typeof userUpdateSchema>;
export type UserCredentialsUpdate = z.infer<typeof userCredentialsUpdateSchema>;
export type CheckUsername = z.infer<typeof checkUsernameSchema>;
