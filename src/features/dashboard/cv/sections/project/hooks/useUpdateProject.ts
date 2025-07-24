import { useMutation } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { ProjectUpdate } from "../types/project.types";

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      projectId,
      data,
    }: {
      cvId: number;
      projectId: number;
      data: ProjectUpdate;
    }) => {
      const res = await projectService.patch(cvId, projectId, data);
      return res.data;
    },
    onSuccess: (_updated, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "projects"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update project",
        message: "There was an error updating the project.",
        color: "red",
      });
      console.error("Failed to update project", err);
    },
  });
};
