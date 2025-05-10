import { useAuthStore } from "../../auth/store/authStore";
import { useGetProfile } from "./useGetProfile";

export const usePersonalId = () => {
  const { user } = useAuthStore();
  if (!user) throw new Error("User must be logged in to use PersonalId hook");

  const { data } = useGetProfile(user.id);
  if (!data)
    throw new Error("User must have a profile before using PersonalId hook");

  const personalId = data.id;
  return personalId;
};
