import { queryOptions } from "@tanstack/react-query";
import { userService } from "../service/userService";

export const userMeQuery = () =>
  queryOptions({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const res = await userService.getMe();
      return res.data;
    },
    staleTime: Infinity,
  });

export const userStatsQuery = () =>
  queryOptions({
    queryKey: ["user", "stats"],
    queryFn: async () => {
      const res = await userService.getMyStats();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const checkUsernameQuery = (username: string) =>
  queryOptions({
    queryKey: ["user", "check-username", username],
    queryFn: async () => {
      const res = await userService.checkUsername(username);
      return res.data;
    },
    enabled: !!username,
  });

export const emailVerificationQuery = () =>
  queryOptions({
    queryKey: ["user", "email-verification"],
    queryFn: async () => {
      const res = await userService.getMyEmailVerificationStatus();
      return res.data;
    },
  });

export const userProfileProgressQuery = () =>
  queryOptions({
    queryKey: ["user", "profile-progress"],
    queryFn: async () => {
      const res = await userService.getProfileProgress();
      return res.data;
    },
  });
