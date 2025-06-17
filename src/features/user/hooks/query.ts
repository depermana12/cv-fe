import { queryOptions } from "@tanstack/react-query";
import { UserApi } from "../service/UserApi";
import { User } from "../schema/user";

const userApi = new UserApi<User, any>();
export const userMeQuery = () =>
  queryOptions({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const res = await userApi.getMe();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const userStatsQuery = () =>
  queryOptions({
    queryKey: ["user", "stats"],
    queryFn: async () => {
      const res = await userApi.getMyStats();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const checkUsernameQuery = (username: string) =>
  queryOptions({
    queryKey: ["user", "check-username", username],
    queryFn: async () => {
      const res = await userApi.checkUsername(username);
      return res.data.data;
    },
    enabled: !!username, // only run if username is not empty
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

export const emailVerificationQuery = () =>
  queryOptions({
    queryKey: ["user", "email-verification"],
    queryFn: async () => {
      const res = await userApi.getMyEmailVerificationStatus();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
