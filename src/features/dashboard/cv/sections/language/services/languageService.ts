import { SubResourceApi } from "@/shared/api/SubResourceApi";
import { Language, LanguageInsert } from "../types/language.types";

export const languageService = new SubResourceApi<Language, LanguageInsert>(
  "languages",
);
