import { useMutation } from "@tanstack/react-query";
import { userService } from "../service/userService";
import { notifications } from "@mantine/notifications";
import { queryClient } from "@shared/lib/queryClient";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const res = await userService.deleteMyAccount(password);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });

      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Account deleted",
        message: "Your account has been deleted successfully.",
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete account",
        message: err?.message || "There was an error deleting your account.",
        color: "red",
      });
      console.error("Failed to delete account", err);
    },
  });
};
