import { useMutation } from "@tanstack/react-query";
import { JobTrackerUpdate } from "../types/jobTracker.type";
import { jobTrackerService } from "../services/jobTrackerService";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useUpdateJobApplication = () => {
  return useMutation({
    mutationFn: async (payload: {
      applicationId: number;
      data: JobTrackerUpdate;
    }) => {
      const { applicationId, data } = payload;

      const res = await jobTrackerService.patch(applicationId, data);
      return res.data;
    },
    onSuccess: (_updatedJobApp, payload) => {
      const { applicationId } = payload;

      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["job-application", applicationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["status-timeline", applicationId],
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update Job application",
        message: "There was an error updating your Job application.",
        color: "red",
      });
      console.error("Failed to update Job application", err);
    },
  });
};
