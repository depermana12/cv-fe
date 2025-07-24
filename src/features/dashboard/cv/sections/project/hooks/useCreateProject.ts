import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { queryClient } from "@shared/lib/queryClient";

import { projectService } from "../services/projectService";
import type { ProjectInsert } from "../types/project.types";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      data,
    }: {
      cvId: number;
      data: ProjectInsert;
    }) => {
      const res = await projectService.post(cvId, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", "projects", data.cvId],
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to create project",
        message: "There was an error creating your project.",
        color: "red",
      });
      console.error("Failed to create project", err);
    },
  });
};
