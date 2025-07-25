import { queryOptions } from "@tanstack/react-query";
import { languageService } from "../services/languageService";

export const languageQuery = (cvId: number, languageId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "languages", languageId],
    queryFn: async () => {
      const res = await languageService.get(cvId, languageId);
      return res.data;
    },
    enabled: !!cvId && !!languageId,
  });

export const languagesQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "languages"],
    queryFn: async () => {
      const res = await languageService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
