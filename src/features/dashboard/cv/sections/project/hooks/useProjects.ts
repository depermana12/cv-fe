import { useQuery } from "@tanstack/react-query";
import { projectQuery, projectsQuery } from "./query";

export const useProject = (cvId: number, projectId: number) =>
  useQuery(projectQuery(cvId, projectId));

export const useProjects = (cvId: number) => useQuery(projectsQuery(cvId));
