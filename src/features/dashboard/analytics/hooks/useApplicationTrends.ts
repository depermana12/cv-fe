import { useQuery } from "@tanstack/react-query";
import { applicationTrendsQuery } from "./query";

export const useApplicationTrends = (userId: number, days: number) => {
  return useQuery(applicationTrendsQuery(userId, days));
};
