import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCourses = (cvId: number) => {
  return useQuery({
    queryKey: ["cvs", cvId, "courses"],
    queryFn: async () => {
      const res = await courseService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
};
