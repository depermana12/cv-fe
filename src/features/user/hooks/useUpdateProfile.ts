import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { User, UserUpdateProfile } from "../schema/user";
import { UserApi } from "../service/UserApi";
import { notifications } from "@mantine/notifications";

const userApi = new UserApi<User, UserUpdateProfile>();
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (updateData: UserUpdateProfile) => {
      const res = await userApi.updateMe(updateData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Profile updated",
        message: `Your profile has been updated successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update profile",
        message: "There was an error updating your profile.",
        color: "red",
      });
      console.error("Failed to update profile", err);
    },
  });
};
