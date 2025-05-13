import { useMutation } from "@tanstack/react-query";
import { WorkForm } from "../types/types";
import { workService } from "../services/workService";
import { notifications } from "@mantine/notifications";

export const useCreateWork = () => {
  return useMutation({
    mutationFn: async (workInput: WorkForm) => {
      const res = await workService.post(workInput);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Work info saved",
        message: `Your work information for ${data.company} has been saved successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save work info",
        message: "There was an error saving your work information.",
        color: "red",
      });
      console.error("Failed to save work info", err);
    },
  });
};
