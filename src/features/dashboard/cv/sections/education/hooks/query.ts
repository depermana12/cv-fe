import { queryOptions } from "@tanstack/react-query";
import { educationService } from "../services/educationService";

export const educationQuery = (cvId: number, educationId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "educations", educationId],
    queryFn: async () => {
      const res = await educationService.get(cvId, educationId);
      return res.data;
    },
    enabled: !!cvId && !!educationId,
  });

export const educationsQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "educations"],
    queryFn: async () => {
      const res = await educationService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
