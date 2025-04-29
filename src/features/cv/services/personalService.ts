import { PersonalForm, PersonalDTO } from "../types/types";
import { CvApi } from "./api";

export const profileService = new CvApi<PersonalDTO, PersonalForm>(
  "cv/personals",
);
