import { useMutation } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      projectId,
    }: {
      cvId: number;
      projectId: number;
    }) => {
      const res = await projectService.delete(cvId, projectId);
      return res.data;
    },
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "projects"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete project",
        message: "There was an error deleting the project.",
        color: "red",
      });
      console.error("Failed to delete project", err);
    },
  });
};
