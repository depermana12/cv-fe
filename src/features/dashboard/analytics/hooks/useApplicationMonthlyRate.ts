import { useQuery } from "@tanstack/react-query";
import { applicationMonthlyRateQuery } from "./query";

export const useApplicationMonthlyRate = (userId: number) => {
  return useQuery(applicationMonthlyRateQuery(userId));
};
