import { LocationDTO, LocationForm } from "../types/types";
import { CvApi } from "./Api";

export const location = new CvApi<LocationDTO, LocationForm>("cv/locations");
