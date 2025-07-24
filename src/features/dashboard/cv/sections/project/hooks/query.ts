import { queryOptions } from "@tanstack/react-query";
import { projectService } from "../services/projectService";

export const projectQuery = (cvId: number, projectId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "projects", projectId],
    queryFn: async () => {
      const res = await projectService.get(cvId, projectId);
      return res.data;
    },
    enabled: !!cvId && !!projectId,
  });

export const projectsQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "projects"],
    queryFn: async () => {
      const res = await projectService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
