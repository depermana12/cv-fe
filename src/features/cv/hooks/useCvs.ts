import { useSuspenseQuery } from "@tanstack/react-query";
import { cvsQuery, cvsPaginatedQuery } from "./query";
import type { CvQueryOptions } from "../types/types";

export const useCvs = () => useSuspenseQuery(cvsQuery());

export const useCvsPaginated = (options?: CvQueryOptions) =>
  useSuspenseQuery(cvsPaginatedQuery(options));
