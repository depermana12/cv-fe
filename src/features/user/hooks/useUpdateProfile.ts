import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { UserUpdateProfile } from "../types/user.types";
import { notifications } from "@mantine/notifications";
import { userService } from "../service/userService";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (updateData: UserUpdateProfile) => {
      const res = await userService.updateMe(updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Profile updated",
        message: `Your profile has been updated successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
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
