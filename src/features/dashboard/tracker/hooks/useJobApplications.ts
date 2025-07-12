import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { JobTrackerQueryOptions } from "../types/jobTracker.type";
import { jobTrackerService } from "../services/jobTrackerService";

// TODO: suspense
export const jobApplicationQuery = (options?: JobTrackerQueryOptions) => {
  return queryOptions({
    queryKey: ["job-applications", options],
    queryFn: async () => {
      const res = await jobTrackerService.getAllwithPagination(options);
      return {
        data: res.data.data,
        total: res.data.pagination.total,
        limit: res.data.pagination.limit,
        offset: res.data.pagination.offset,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useJobApplications = (options?: JobTrackerQueryOptions) => {
  return useSuspenseQuery(jobApplicationQuery(options));
};
