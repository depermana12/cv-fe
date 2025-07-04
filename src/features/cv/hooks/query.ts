import { queryOptions } from "@tanstack/react-query";
import { cvApi } from "../services/CvApi";
import type { CvQueryOptions } from "../types/types";

export const cvsQuery = () =>
  queryOptions({
    queryKey: ["cvs"],
    queryFn: async () => {
      const res = await cvApi.getAll();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvsPaginatedQuery = (options?: CvQueryOptions) =>
  queryOptions({
    queryKey: ["cvs-paginated", options],
    queryFn: async () => {
      const res = await cvApi.getAllWithPagination(options);
      return {
        data: res.data.data,
        total: res.data.pagination.total,
        limit: res.data.pagination.limit,
        offset: res.data.pagination.offset,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cv", cvId],
    queryFn: async () => {
      const res = await cvApi.get(cvId);
      return res.data.data;
    },
    enabled: !!cvId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
