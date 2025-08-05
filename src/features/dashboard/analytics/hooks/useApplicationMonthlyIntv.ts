import { useQuery } from "@tanstack/react-query";
import { applicationsMonthlyInterviewQuery } from "./query";

export const useApplicationMonthlyIntv = (userId: number) => {
  const query = applicationsMonthlyInterviewQuery(userId);
  return useQuery(query);
};
