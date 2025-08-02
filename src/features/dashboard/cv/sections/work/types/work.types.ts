import { z } from "zod";
import {
  workSchema,
  workCreateSchema,
  workUpdateSchema,
} from "../schema/workSchema";

export type Work = z.infer<typeof workSchema>;
export type WorkInsert = z.infer<typeof workCreateSchema>;
export type WorkUpdate = z.infer<typeof workUpdateSchema>;

export type WorkFormMode = "create" | "edit";

export type WorkFormProps = {
  mode: WorkFormMode;
  initialData?: Work;
  onSuccess?: () => void;
};
