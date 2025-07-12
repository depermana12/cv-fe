import { useMutation } from "@tanstack/react-query";
import { jobTrackerService } from "../services/jobTrackerService";
import { queryClient } from "../../../../lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteJobApplication = () => {
  return useMutation({
    mutationFn: async (applicationId: number) => {
      await jobTrackerService.delete(applicationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete job application",
        message: err?.message || "There was an error deleting job application",
        color: "red",
      });
      console.error("Failed to delete", err);
    },
  });
};
