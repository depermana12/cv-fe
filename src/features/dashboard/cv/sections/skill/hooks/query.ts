import { queryOptions } from "@tanstack/react-query";
import { skillService } from "../services/skillService";

export const skillQuery = (cvId: number, skillId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "skills", skillId],
    queryFn: async () => {
      const res = await skillService.get(cvId, skillId);
      return res.data;
    },
    enabled: !!cvId && !!skillId,
  });

export const skillsQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "skills"],
    queryFn: async () => {
      const res = await skillService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
