import { useQuery } from "@tanstack/react-query";
import { cvsQuery, cvsPaginatedQuery } from "./query";
import type { CvQueryOptions } from "../types/types";

export const useCvs = () => useQuery(cvsQuery());

export const useCvsPaginated = (options?: CvQueryOptions) =>
  useQuery(cvsPaginatedQuery(options));
