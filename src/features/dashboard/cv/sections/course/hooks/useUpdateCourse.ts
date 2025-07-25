import { useMutation } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { CourseUpdate } from "../types/course.types";

export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      courseId,
      data,
    }: {
      cvId: number;
      courseId: number;
      data: CourseUpdate;
    }) => {
      const res = await courseService.patch(cvId, courseId, data);
      return res.data;
    },
    onSuccess: (_updated, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "courses"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update course",
        message: "There was an error updating the course.",
        color: "red",
      });
      console.error("Failed to update course", err);
    },
  });
};
