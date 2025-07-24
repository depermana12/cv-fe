import { queryOptions } from "@tanstack/react-query";
import { workService } from "../services/workService";

export const workQuery = (cvId: number, workId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "works", workId],
    queryFn: async () => {
      const res = await workService.get(cvId, workId);
      return res.data;
    },
    enabled: !!cvId && !!workId,
  });

export const worksQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "works"],
    queryFn: async () => {
      const res = await workService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
