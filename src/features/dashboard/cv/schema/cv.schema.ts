import { z } from "zod";

export const cvSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title required" })
    .max(255, { message: "Max 255 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .max(1000, { message: "Max 1000 characters" }),
  theme: z
    .string()
    .max(100, { message: "Max 100 characters" })
    .default("default"),
  isPublic: z.boolean().default(false),
  slug: z
    .string()
    .max(255, { message: "Max 255 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    })
    .optional(),
  views: z.number().int().nonnegative().default(0),
  downloads: z.number().int().nonnegative().default(0),
  language: z.string().length(2).default("id"),
  createdAt: z.coerce.date({ message: "Invalid created at date" }),
  updatedAt: z.coerce.date({ message: "Invalid updated at date" }),
});

export const cvCreateSchema = cvSchema.omit({
  id: true,
  userId: true,
  views: true,
  downloads: true,
  createdAt: true,
  updatedAt: true,
});

export const cvUpdateSchema = cvCreateSchema.partial();

export const cvQueryOptionsSchema = z.object({
  search: z.string().optional(),
  sortBy: z
    .enum(["title", "createdAt", "updatedAt"], {
      message: "Invalid sort field",
    })
    .optional(),
  sortOrder: z
    .enum(["asc", "desc"], { message: "Invalid sort order" })
    .optional(),
  limit: z
    .number()
    .int({ message: "Must be integer" })
    .positive({ message: "Must be positive" })
    .default(10),
  offset: z
    .number()
    .int({ message: "Must be integer" })
    .nonnegative({ message: "Cannot be negative" })
    .default(0),
  from: z.coerce.date({ message: "Invalid from date" }).optional(),
  to: z.coerce.date({ message: "Invalid to date" }).optional(),
});

export const cvStatsSchema = z.object({
  totalCvs: z.number().int().nonnegative(),
  publicCvs: z.number().int().nonnegative(),
  privateCvs: z.number().int().nonnegative(),
  totalViews: z.number().int().nonnegative(),
  totalDownloads: z.number().int().nonnegative(),
  averageViews: z.number().nonnegative(),
  averageDownloads: z.number().nonnegative(),
  mostViewedCv: z
    .object({
      id: z.number().int().positive(),
      title: z.string(),
      views: z.number().int().nonnegative(),
    })
    .nullable(),
  mostDownloadedCv: z
    .object({
      id: z.number().int().positive(),
      title: z.string(),
      downloads: z.number().int().nonnegative(),
    })
    .nullable(),
});

export const cvSlugParamsSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
});
