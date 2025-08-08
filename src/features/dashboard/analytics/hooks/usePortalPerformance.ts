import { useQuery } from "@tanstack/react-query";
import { portalPerformanceQuery } from "./query";

export const usePortalPerformance = (userId: number) => {
  return useQuery(portalPerformanceQuery(userId));
};
