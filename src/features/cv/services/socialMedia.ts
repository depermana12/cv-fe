import { SocialMediaDTO, SocialMediaForm } from "../types/types";
import { CvApi } from "./Api";

export const socialMediaService = new CvApi<SocialMediaDTO, SocialMediaForm>(
  "cv/socials",
);
