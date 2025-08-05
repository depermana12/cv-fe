import { useQuery } from "@tanstack/react-query";
import { applicationMonthlyGoalQuery } from "./query";

export const useApplicationGoal = (userId: number) => {
  const query = applicationMonthlyGoalQuery(userId);
  return useQuery(query);
};
