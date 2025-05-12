import { SkillDTO, SkillForm } from "../types/types";
import { CvApi } from "./Api";

export const skillService = new CvApi<SkillDTO, SkillForm>("cv/skills");
