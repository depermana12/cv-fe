import { queryOptions } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const courseQuery = (cvId: number, courseId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "courses", courseId],
    queryFn: async () => {
      const res = await courseService.get(cvId, courseId);
      return res.data;
    },
    enabled: !!cvId && !!courseId,
  });

export const coursesQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "courses"],
    queryFn: async () => {
      const res = await courseService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
