import { profileQuery } from "../queries/profileQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetProfile = (userId: number) =>
  useSuspenseQuery(profileQuery(userId));
