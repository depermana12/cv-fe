import { useQuery } from "@tanstack/react-query";
import { JobTrackerQueryOptions } from "../types/jobTracker.type";
import { jobApplicationsQuery } from "./query";

export const useJobApplications = (options?: JobTrackerQueryOptions) => {
  return useQuery(jobApplicationsQuery(options));
};
