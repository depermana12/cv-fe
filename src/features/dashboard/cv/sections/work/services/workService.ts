import { SubResourceApi } from "@shared/api/SubResourceApi";
import type { Work, WorkInsert } from "../types/work.types";

export const workService = new SubResourceApi<Work, WorkInsert>("works");
