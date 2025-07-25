import { queryOptions } from "@tanstack/react-query";
import type { CvQueryOptions } from "../types/types";
import { cvService } from "../services/cvService";

export const cvQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cv", cvId],
    queryFn: async () => {
      const response = await cvService.get(cvId);
      return response.data;
    },
    enabled: !!cvId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvsQuery = () =>
  queryOptions({
    queryKey: ["cvs"],
    queryFn: async () => {
      const response = await cvService.getAll();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvsPaginatedQuery = (options?: CvQueryOptions) =>
  queryOptions({
    queryKey: ["cvs-paginated", options],
    queryFn: async () => {
      const response = await cvService.getAllWithPagination(options);
      return {
        data: response.data,
        total: response.pagination.total,
        limit: response.pagination.limit,
        offset: response.pagination.offset,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const cvStatsQuery = () =>
  queryOptions({
    queryKey: ["cv-stats"],
    queryFn: async () => {
      const response = await cvService.getMeStats();
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes for stats
  });

export const cvByUsernameSlugQuery = (username: string, slug: string) =>
  queryOptions({
    queryKey: ["cv-public", username, slug],
    queryFn: async () => {
      const response = await cvService.getByUsernameAndSlug(username, slug);
      return response.data;
    },
    enabled: !!(username && slug),
    staleTime: 1000 * 60 * 10, // 10 minutes for public CVs
  });

export const slugAvailabilityQuery = (slug: string, excludeCvId?: number) =>
  queryOptions({
    queryKey: ["slug-availability", slug, excludeCvId],
    queryFn: async () => {
      const response = await cvService.slugExists(slug, excludeCvId || 0);
      return response.data;
    },
    enabled: !!slug && slug.length > 0,
    staleTime: 1000 * 30, // 30 seconds for real-time availability
  });
