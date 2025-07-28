import { useMutation } from "@tanstack/react-query";
import { workService } from "../services/workService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { WorkUpdate } from "../types/work.types";

export const useUpdateWork = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      workId,
      data,
    }: {
      cvId: number;
      workId: number;
      data: WorkUpdate;
    }) => {
      const res = await workService.patch(cvId, workId, data);
      return res.data;
    },
    onSuccess: (_updated, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "works"] });
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Work experience updated successfully",
        message: "Work experience has been updated successfully.",
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update work experience",
        message: "There was an error updating the work experience.",
        color: "red",
      });
      console.error("Failed to update work experience", err);
    },
  });
};
