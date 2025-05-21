import { queryOptions } from "@tanstack/react-query";
import { profileService } from "../modules/personal/services/personalService";

export const profileQuery = (userId: number, service = profileService) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await service.get(userId);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
