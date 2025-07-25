import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { courseService } from "../services/courseService";
import { queryClient } from "@shared/lib/queryClient";
import type { CourseInsert } from "../types/course.types";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      data,
    }: {
      cvId: number;
      data: CourseInsert;
    }) => {
      const res = await courseService.post(cvId, data);
      return res.data;
    },
    onSuccess: (_data, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "courses"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to add course",
        message: "There was an error adding your course.",
        color: "red",
      });
      console.error("Failed to add course", err);
    },
  });
};
