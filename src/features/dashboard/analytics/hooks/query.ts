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

export const applicationMonthlyRateQuery = (userId: number) => {
  return queryOptions({
    queryKey: ["applicationMonthlyRate", userId],
    queryFn: () => analyticService.applicationMonthlyRate(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};

// TODO: invalidate in the job mutation
export const applicationMonthlyGoalQuery = (userId: number) => {
  return queryOptions({
    queryKey: ["applicationMonthlyGoal", userId],
    queryFn: () => analyticService.applicationMonthlyGoal(userId),
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !!userId,
  });
};

// TODO: invalidate in the job statuses mutation
export const applicationsMonthlyInterviewQuery = (userId: number) => {
  return queryOptions({
    queryKey: ["applicationsMonthlyInterview", userId],
    queryFn: () => analyticService.applicationsMonthlyInterview(userId),
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !!userId,
  });
};
