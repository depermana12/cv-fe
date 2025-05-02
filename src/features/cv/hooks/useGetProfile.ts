import { useQuery } from "@tanstack/react-query";
import { profileService } from "../services/personalService";
import { useAuthStore } from "../../auth/store/authStore";

export const useGetProfile = (service = profileService) => {
  const { user } = useAuthStore();
  if (!user) throw new Error("user not authenticated");
  return useQuery({
    queryKey: ["profile", "personal"],
    queryFn: async () => {
      const res = await service.get(user.id);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
