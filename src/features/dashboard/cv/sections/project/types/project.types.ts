import { z } from "zod";
import {
  projectSchema,
  projectCreateSchema,
  projectUpdateSchema,
} from "../schema/projectSchema";

export type Project = z.infer<typeof projectSchema>;
export type ProjectInsert = z.infer<typeof projectCreateSchema>;
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;

export type ProjectFormMode = "create" | "edit";

export type ProjectFormProps = {
  mode: ProjectFormMode;
  cvId: number;
  initialData?: Project;
  onSuccess?: () => void;
};
