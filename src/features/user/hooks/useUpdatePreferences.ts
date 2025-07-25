import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { UserPreferencesUpdate } from "../types/user.types";
import { userService } from "../service/userService";
import { notifications } from "@mantine/notifications";

export const useUpdatePreferences = () => {
  return useMutation({
    mutationFn: async (updateData: UserPreferencesUpdate) => {
      const res = await userService.updateMyPreferences(updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Preferences updated",
        message: `Your preferences have been updated successfully.`,
        color: "green",
      });
    },
    onError: (err: any) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update preferences",
        message:
          err?.response?.data?.message ||
          "There was an error updating your preferences.",
        color: "red",
      });
      console.error("Failed to update preferences", err);
    },
  });
};
