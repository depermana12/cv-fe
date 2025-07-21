import { z } from "zod";

export const cvSchema = z.object({
  id: z
    .number()
    .int({ message: "Invalid ID" })
    .positive({ message: "ID must be positive" }),
  userId: z
    .number()
    .int({ message: "Invalid user ID" })
    .positive({ message: "User ID must be positive" }),
  title: z
    .string()
    .min(1, { message: "Title required" })
    .max(255, { message: "Max 255 characters" }),
  description: z
    .string()
    .max(1000, { message: "Max 1000 characters" })
    .nullable()
    .default(null),
  theme: z
    .string()
    .max(100, { message: "Max 100 characters" })
    .nullable()
    .default(null),
  isPublic: z.boolean().default(false),
  slug: z
    .string()
    .max(255, { message: "Max 255 characters" })
    .nullable()
    .default(null),
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

export const cvUpdateSchema = cvCreateSchema.partial().extend({
  id: z
    .number()
    .int({ message: "Invalid ID" })
    .positive({ message: "ID must be positive" }),
});

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
