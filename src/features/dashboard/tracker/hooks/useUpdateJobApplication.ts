import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { JobTracker, JobTrackerUpdate } from "../types/jobTracker.type";
import { ApiResponse } from "../../../types/types";
import { jobTrackerService } from "../services/jobTrackerService";

interface UpdateJobApplicationParams {
  id: number;
  data: JobTrackerUpdate;
}

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ApiResponse<JobTracker>>,
    Error,
    UpdateJobApplicationParams
  >({
    mutationFn: async ({ id, data }: UpdateJobApplicationParams) => {
      return jobTrackerService.patch(id, data);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-application", id] });
    },
  });
};
