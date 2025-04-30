import { PersonalForm, PersonalDTO } from "../types/types";
import { CvApi } from "./Api";

export const profileService = new CvApi<PersonalDTO, PersonalForm>(
  "cv/personals",
);
