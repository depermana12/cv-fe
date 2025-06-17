import { queryOptions } from "@tanstack/react-query";
import { cvApi } from "../services/CvApi";

export const cvsQuery = () =>
  queryOptions({
    queryKey: ["cvs"],
    queryFn: async () => {
      const res = await cvApi.getAll();
      return res.data.data;
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
