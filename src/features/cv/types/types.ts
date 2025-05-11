import { z } from "zod";
import {
  personalCreateSchema,
  personalSelectSchema,
} from "../schema/personalSchema";
import {
  educationCreateSchema,
  educationSchema,
} from "../schema/educationSchema";
import { workCreateSchema, workSchema } from "../schema/workSchema";
import {
  projectCreateSchema,
  projectDescCreateSchema,
  projectDescSchema,
  projectSchema,
} from "../schema/projectSchema";

export type PersonalForm = z.infer<typeof personalCreateSchema>;
export type PersonalDTO = z.infer<typeof personalSelectSchema>;

export type EducationForm = z.infer<typeof educationCreateSchema>;
export type EducationDTO = z.infer<typeof educationSchema>;

export type WorkForm = z.infer<typeof workCreateSchema>;
export type WorkDTO = z.infer<typeof workSchema>;

export type ProjectForm = z.infer<typeof projectCreateSchema>;
export type ProjectDto = z.infer<typeof projectSchema>;

export type ProjectDescForm = z.infer<typeof projectDescCreateSchema>;
export type ProjectDescDto = z.infer<typeof projectDescSchema>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Personal = {
  id: number;
  userId: number;
  fullName: string;
  bio: string;
  image: string;
  summary: string;
  phone: string;
  email: string;
  url: string;
  createdAt: string;
};
