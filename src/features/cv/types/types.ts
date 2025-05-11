import { z } from "zod";
import {
  personalCreateSchema,
  personalSelectSchema,
} from "../schema/personalSchema";
import {
  educationCreateSchema,
  educationSchema,
} from "../schema/educationSchema";

export type PersonalForm = z.infer<typeof personalCreateSchema>;
export type PersonalDTO = z.infer<typeof personalSelectSchema>;

export type EducationForm = z.infer<typeof educationCreateSchema>;
export type EducationDTO = z.infer<typeof educationSchema>;

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
