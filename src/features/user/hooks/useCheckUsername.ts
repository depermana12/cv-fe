import { useQuery } from "@tanstack/react-query";
import { checkUsernameQuery } from "./query";

export const useCheckUsername = (username: string) =>
  useQuery(checkUsernameQuery(username));
