import { useMutation } from "@tanstack/react-query";
import { profileService } from "../services/personalService";
import { PersonalForm } from "../types/types";
import { notifications } from "@mantine/notifications";

export const useUpdatePersonal = () => {
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & PersonalForm) => {
      const res = await profileService.patch(id, data);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: `Personal info for ${data.fullName} saved`,
        message: "Your personal information has been saved successfully.",
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save personal info",
        message: "There was an error saving your personal information.",
        color: "red",
      });
      console.error("Failed to save personal info", err);
    },
  });
};
