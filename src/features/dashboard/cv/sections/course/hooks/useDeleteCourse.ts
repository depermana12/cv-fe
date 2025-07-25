import { useMutation } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      courseId,
    }: {
      cvId: number;
      courseId: number;
    }) => {
      const res = await courseService.delete(cvId, courseId);
      return res.data;
    },
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "courses"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete course",
        message: "There was an error deleting the course.",
        color: "red",
      });
      console.error("Failed to delete course", err);
    },
  });
};
