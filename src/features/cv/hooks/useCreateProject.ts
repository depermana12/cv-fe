import { useMutation } from "@tanstack/react-query";
import { ProjectForm } from "../types/types";
import { projectService } from "../services/projectService";
import { notifications } from "@mantine/notifications";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async (projectInput: ProjectForm) => {
      const res = await projectService.post(projectInput);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Project info saved",
        message: `Your project information for ${data.name} has been saved successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save project info",
        message: "There was an error saving your project information.",
        color: "red",
      });
      console.error("Failed to save project info", err);
    },
  });
};
