import { queryOptions } from "@tanstack/react-query";
import { JobTrackerQueryOptions } from "../types/jobTracker.type";
import { jobTrackerService } from "../services/jobTrackerService";

export const jobApplicationsQuery = (options?: JobTrackerQueryOptions) => {
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
    staleTime: Infinity,
  });
};

export const jobApplicationByIdQuery = (applicationId: number) =>
  queryOptions({
    queryKey: ["job-application", applicationId],
    queryFn: async () => {
      const res = await jobTrackerService.get(applicationId);
      return res.data;
    },
    enabled: !!applicationId,
    staleTime: Infinity,
  });

export const jobApplicationStatusQuery = (applicationId: number) =>
  queryOptions({
    queryKey: ["status-timeline", applicationId],
    queryFn: async () => {
      const res = await jobTrackerService.getStatusTimeline(applicationId);
      return res.data.data;
    },
    enabled: !!applicationId,
    staleTime: Infinity,
  });
