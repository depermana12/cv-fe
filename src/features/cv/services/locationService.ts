import { LocationDTO, LocationForm } from "../types/types";
import { CvApi } from "./Api";

export const locationService = new CvApi<LocationDTO, LocationForm>(
  "cv/locations",
);
