import { useMutation } from "@tanstack/react-query";
import { workService } from "../services/workService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteWork = () => {
  return useMutation({
    mutationFn: async ({ cvId, workId }: { cvId: number; workId: number }) => {
      const res = await workService.delete(cvId, workId);
      return res.data;
    },
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "works"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete work experience",
        message: "There was an error deleting the work experience.",
        color: "red",
      });
      console.error("Failed to delete work experience", err);
    },
  });
};
