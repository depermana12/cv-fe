import { z } from "zod";

export const jobTrackerCreateSchema = z.object({
  cvId: z.number().int().positive().nullable(),
  jobPortal: z
    .string()
    .max(100, { message: "Job portal must be 100 characters or less" }),
  jobUrl: z
    .string()
    .max(255, { message: "Job URL must be 255 characters or less" })
    .nullable(),
  companyName: z
    .string()
    .min(1, { message: "Company name must be at least 8 characters" })
    .max(255, { message: "Company name must be 255 characters or less" }),
  jobTitle: z
    .string()
    .min(1, { message: "Job title must be at least 8 charachters" })
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
});

export const jobTrackerUpdateSchema = jobTrackerCreateSchema.partial();

export const jobTrackerSchema = jobTrackerCreateSchema.extend({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const jobTrackerStatusSchema = z.object({
  id: z.number().int().positive(),
  applicationId: z.number().int().positive(),
  status: z
    .enum(
      ["applied", "interview", "offer", "rejected", "accepted", "ghosted"],
      { message: "Invalid status" },
    )
    .default("applied"),
  changedAt: z.coerce.date(),
});

export const jobTrackerStatusUpdateSchema = jobTrackerStatusSchema
  .partial()
  .extend({ statusChangedAt: z.coerce.date().optional() });

export const jobTrackerQueryOptionsSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(["position", "companyName", "status", "appliedAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  appliedAtFrom: z.coerce.date().optional(),
  appliedAtTo: z.coerce.date().optional(),
});
