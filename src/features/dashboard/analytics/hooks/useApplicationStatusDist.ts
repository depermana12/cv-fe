import { useQuery } from "@tanstack/react-query";
import { applicationStatusDistributionQuery } from "./query";

export const useApplicationStatusDist = (userId: number) => {
  return useQuery(applicationStatusDistributionQuery(userId));
};
