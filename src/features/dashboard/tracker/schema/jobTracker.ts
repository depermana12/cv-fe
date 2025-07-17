import { z } from "zod";

const idSchema = z.number().int().positive();

export const jobTrackerSchema = z.object({
  id: idSchema,
  userId: idSchema,
  cvId: idSchema.nullable(),
  jobPortal: z
    .string()
    .max(100, { message: "Job portal must be 100 characters or less" }),
  jobUrl: z
    .string()
    .max(255, { message: "Job URL must be 255 characters or less" })
    .nullable(),
  companyName: z
    .string()
    .min(8, { message: "Company name must be at least 8 characters" })
    .max(255, { message: "Company name must be 255 characters or less" }),
  jobTitle: z
    .string()
    .min(8, { message: "Job title must be at least 8 charachters" })
    .max(255, { message: "Job title must be 255 characters or less" }),
  jobType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
    "Volunteer",
  ]),
  position: z.enum([
    "Manager",
    "Lead",
    "Senior",
    "Mid-level",
    "Junior",
    "Intern",
    "Entry-level",
    "Staff",
    "Other",
  ]),

  location: z.string().max(255, {
    message: "Location must be 255 characters or less",
  }),
  locationType: z.enum(["Remote", "On-site", "Hybrid"]),
  status: z
    .enum(
      ["applied", "interview", "offer", "rejected", "accepted", "ghosted"],
      { message: "Invalid status" },
    )
    .default("applied"),
  notes: z.string().nullable(),
  appliedAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const jobTrackerImportSchema = jobTrackerSchema.omit({
  userId: true,
  cvId: true,
});

export const jobTrackerStatusSchema = z.object({
  id: idSchema,
  applicationId: idSchema,
  status: z
    .enum(
      ["applied", "interview", "offer", "rejected", "accepted", "ghosted"],
      { message: "Invalid status" },
    )
    .default("applied"),
  changedAt: z.coerce.date(),
});

export const jobTrackerStatusCreateSchema = jobTrackerStatusSchema.omit({
  id: true,
  applicationId: true,
});

export const jobTrackerStatusUpdateSchema = jobTrackerStatusCreateSchema
  .partial()
  .extend({ statusChangedAt: z.coerce.date().optional() });

export const jobTrackerCreateSchema = jobTrackerSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const jobTrackerUpdateSchema = jobTrackerCreateSchema.partial();

export const jobTrackerQueryOptionsSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(["position", "companyName", "status", "appliedAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  appliedAtFrom: z.coerce.date().optional(),
  appliedAtTo: z.coerce.date().optional(),
});
