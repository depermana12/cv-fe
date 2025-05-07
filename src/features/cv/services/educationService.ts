import { CvApi } from "./Api";
import type { EducationDTO, EducationForm } from "../types/types";

export const educationService = new CvApi<EducationDTO, EducationForm>(
  "cv/education",
);
