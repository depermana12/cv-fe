import { useQuery } from "@tanstack/react-query";
import { jobApplicationByIdQuery } from "./query";

export const useJobApplication = (applicationId: number) => {
  return useQuery(jobApplicationByIdQuery(applicationId));
};
