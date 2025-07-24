import { SubResourceApi } from "@shared/api/SubResourceApi";
import { Project, ProjectInsert } from "../types/project.types";

export const projectService = new SubResourceApi<Project, ProjectInsert>(
  "projects",
);
