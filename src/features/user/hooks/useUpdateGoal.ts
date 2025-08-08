import { useMutation } from "@tanstack/react-query";
import { userService } from "../service/userService";
import { UpdateMonthlyGoal } from "../types/user.types";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useUpdateGoal = () => {
  return useMutation({
    mutationFn: async (updateData: UpdateMonthlyGoal) => {
      const res = await userService.updateMonthlyGoal(updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (err: any) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Failed to update goal",
        message:
          err?.response?.data?.message ||
          "There was an error updating your goal.",
        color: "red",
      });
      console.error("Failed to update goal", err);
    },
  });
};
