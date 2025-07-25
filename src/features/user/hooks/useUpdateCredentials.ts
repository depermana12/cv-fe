import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { UserCredentialsUpdate } from "../types/user.types";
import { userService } from "../service/userService";
import { notifications } from "@mantine/notifications";

export const useUpdateCredentials = () => {
  return useMutation({
    mutationFn: async (updateData: UserCredentialsUpdate) => {
      const res = await userService.updateMyCredentials(updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Credentials updated",
        message: `Your credentials have been updated successfully.`,
        color: "green",
      });
    },
    onError: (err: any) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update credentials",
        message:
          err?.response?.data?.message ||
          "There was an error updating your credentials.",
        color: "red",
      });
      console.error("Failed to update credentials", err);
    },
  });
};
