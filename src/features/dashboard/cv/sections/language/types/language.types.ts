import { z } from "zod";
import {
  languageSchema,
  languageInsertSchema,
  languageUpdateSchema,
} from "../schema/languageSchema";

export type Language = z.infer<typeof languageSchema>;
export type LanguageInsert = z.infer<typeof languageInsertSchema>;
export type LanguageUpdate = z.infer<typeof languageUpdateSchema>;

export type LanguageFormMode = "create" | "edit";

export type LanguageFormProps = {
  mode: LanguageFormMode;
  initialData?: Language;
  onSuccess?: () => void;
};
