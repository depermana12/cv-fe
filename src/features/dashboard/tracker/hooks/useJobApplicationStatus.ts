import { useQuery } from "@tanstack/react-query";
import { jobApplicationStatusQuery } from "./query";

export const useJobApplicationStatus = (applicationId: number) => {
  return useQuery(jobApplicationStatusQuery(applicationId));
};
