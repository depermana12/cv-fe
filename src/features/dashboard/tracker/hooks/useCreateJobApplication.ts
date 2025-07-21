import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { JobTrackerCreate } from "../types/jobTracker.type";
import { notifications } from "@mantine/notifications";
import { jobTrackerService } from "../services/jobTrackerService";

export const useCreateJobApplication = () => {
  return useMutation({
    mutationFn: async (data: JobTrackerCreate) => {
      const res = await jobTrackerService.post(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to add job application",
        message: err?.message || "There was an error adding job application.",
        color: "red",
      });
      console.error("Failed to add", err);
    },
  });
};
