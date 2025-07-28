import { queryOptions } from "@tanstack/react-query";
import { analyticService } from "../services/analyticService";

export const applicationTrendsQuery = (userId: number, days: number) => {
  return queryOptions({
    queryKey: ["applicationTrends", userId, days],
    queryFn: () => analyticService.applicationTrends(userId, days),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};

export const applicationStatusDistributionQuery = (userId: number) => {
  return queryOptions({
    queryKey: ["applicationStatusDistribution", userId],
    queryFn: () => analyticService.applicationStatusDistribution(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};
