import { useQuery } from "@tanstack/react-query";
import { userProfileProgressQuery } from "./query";

export const useProfileProgress = () => {
  const query = userProfileProgressQuery();
  return useQuery(query);
};
