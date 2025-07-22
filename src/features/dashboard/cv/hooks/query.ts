import { queryOptions } from "@tanstack/react-query";
import { cvApi } from "../services/CvApi";
import type { CvQueryOptions } from "../types/types";

export const cvQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cv", cvId],
    queryFn: async () => {
      const response = await cvApi.get(cvId);
      return response.data;
    },
    enabled: !!cvId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvsQuery = () =>
  queryOptions({
    queryKey: ["cvs"],
    queryFn: async () => {
      const response = await cvApi.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvsPaginatedQuery = (options?: CvQueryOptions) =>
  queryOptions({
    queryKey: ["cvs-paginated", options],
    queryFn: async () => {
      const response = await cvApi.getAllWithPagination(options);
      return {
        data: response.data,
        total: response.pagination.total,
        limit: response.pagination.limit,
        offset: response.pagination.offset,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
