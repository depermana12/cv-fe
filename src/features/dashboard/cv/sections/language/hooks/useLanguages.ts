import { useQuery } from "@tanstack/react-query";
import { languageQuery, languagesQuery } from "./query";

export const useLanguage = (cvId: number, languageId: number) =>
  useQuery(languageQuery(cvId, languageId));

export const useLanguages = (cvId: number) => useQuery(languagesQuery(cvId));
