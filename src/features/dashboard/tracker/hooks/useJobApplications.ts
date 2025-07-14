import { useSuspenseQuery } from "@tanstack/react-query";
import { JobTrackerQueryOptions } from "../types/jobTracker.type";
import { jobApplicationsQuery } from "./query";

// TODO: do not use useSuspense to get the callbak of loading fething
export const useJobApplications = (options?: JobTrackerQueryOptions) => {
  return useSuspenseQuery(jobApplicationsQuery(options));
};
