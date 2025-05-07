import { z } from "zod";
import {
  personalCreateSchema,
  personalSelectSchema,
} from "../schema/personalSchema";
import {
  educationInsertSchema,
  educationSelectSchema,
} from "../schema/educationSchema";

export type PersonalForm = z.infer<typeof personalCreateSchema>;
export type PersonalDTO = z.infer<typeof personalSelectSchema>;

export type EducationForm = z.infer<typeof educationInsertSchema>;
export type EducationDTO = z.infer<typeof educationSelectSchema>;

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
