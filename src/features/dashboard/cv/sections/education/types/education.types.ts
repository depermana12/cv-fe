import { z } from "zod";
import {
  educationCreateSchema,
  educationSchema,
  educationUpdateSchema,
} from "../schema/educationSchema";

export type Education = z.infer<typeof educationSchema>;
export type EducationInsert = z.infer<typeof educationCreateSchema>;
export type EducationUpdate = z.infer<typeof educationUpdateSchema>;

export type EducationFormMode = "create" | "edit";

export type EducationFormProps = {
  mode: EducationFormMode;
  initialData?: Education;
  onSuccess?: () => void;
};
