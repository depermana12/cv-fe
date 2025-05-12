import { ProjectDTO, ProjectForm } from "../types/types";
import { CvApi } from "./Api";

export const projectService = new CvApi<ProjectDTO, ProjectForm>("cv/projects");
