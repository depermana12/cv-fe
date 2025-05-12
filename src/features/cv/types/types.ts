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
import { skillCreateSchema, skillSchema } from "../schema/skillSchema";
import {
  softSkillCreateSchema,
  softSkillSchema,
} from "../schema/softSkillSchema";
import { socialCreateSchema, socialSchema } from "../schema/socialMediaSchema";
import { locationCreateSchema, locationSchema } from "../schema/locationSchema";

export type PersonalForm = z.infer<typeof personalCreateSchema>;
export type PersonalDTO = z.infer<typeof personalSelectSchema>;

export type EducationForm = z.infer<typeof educationCreateSchema>;
export type EducationDTO = z.infer<typeof educationSchema>;

export type WorkForm = z.infer<typeof workCreateSchema>;
export type WorkDTO = z.infer<typeof workSchema>;

export type ProjectForm = z.infer<typeof projectCreateSchema>;
export type ProjectDTO = z.infer<typeof projectSchema>;

export type ProjectDescForm = z.infer<typeof projectDescCreateSchema>;
export type ProjectDescDTO = z.infer<typeof projectDescSchema>;

export type SkillForm = z.infer<typeof skillCreateSchema>;
export type SkillDto = z.infer<typeof skillSchema>;

export type SoftSkillForm = z.infer<typeof softSkillCreateSchema>;
export type SoftSkillDTO = z.infer<typeof softSkillSchema>;

export type SocialMedia = z.infer<typeof socialCreateSchema>;
export type SocialMediaDTO = z.infer<typeof socialSchema>;

export type LocationForm = z.infer<typeof locationCreateSchema>;
export type LocationDTO = z.infer<typeof locationSchema>;

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
