import { SoftSkillDTO, SoftSkillForm } from "../types/types";
import { CvApi } from "./Api";

export const softSkillService = new CvApi<SoftSkillDTO, SoftSkillForm>(
  "cv/soft-skills",
);
