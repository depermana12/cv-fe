import { WorkDTO, WorkForm } from "../types/types";
import { CvApi } from "./Api";

export const workService = new CvApi<WorkDTO, WorkForm>("cv/works");
