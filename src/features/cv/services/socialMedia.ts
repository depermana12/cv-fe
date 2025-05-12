import { SocialMediaDTO } from "../types/types";
import { CvApi } from "./Api";

export const socialMedia = new CvApi<SocialMediaDTO, SocialMediaDTO>(
  "cv/socials",
);
