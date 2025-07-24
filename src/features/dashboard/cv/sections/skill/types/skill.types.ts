import { z } from "zod";
import {
  skillCreateSchema,
  skillSchema,
  skillUpdateSchema,
} from "../schema/skillSchema";

export type Skill = z.infer<typeof skillSchema>;
export type SkillInsert = z.infer<typeof skillCreateSchema>;
export type SkillUpdate = z.infer<typeof skillUpdateSchema>;

export type SkillFormMode = "create" | "edit";

export type SkillFormProps = {
  mode: SkillFormMode;
  initialData?: Skill;
  onSuccess?: () => void;
};
