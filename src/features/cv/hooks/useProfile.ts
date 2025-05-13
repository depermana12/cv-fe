import { profileQuery } from "../queries/profileQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useProfile = (userId: number) =>
  useSuspenseQuery(profileQuery(userId));
