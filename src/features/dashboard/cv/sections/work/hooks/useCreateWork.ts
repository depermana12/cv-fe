import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { queryClient } from "@shared/lib/queryClient";

import { workService } from "../services/workService";
import type { WorkInsert } from "../types/work.types";

export const useCreateWork = () => {
  return useMutation({
    mutationFn: async ({ cvId, data }: { cvId: number; data: WorkInsert }) => {
      const res = await workService.post(cvId, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", "works", variables.cvId],
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save work experience",
        message: "There was an error saving your work experience.",
        color: "red",
      });
      console.error("Failed to save work experience", err);
    },
  });
};
