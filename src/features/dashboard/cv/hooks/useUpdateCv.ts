import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import type { CvUpdate } from "../types/types";
import { notifications } from "@mantine/notifications";
import { cvService } from "../services/cvService";

export const useUpdateCv = () => {
  return useMutation({
    mutationFn: async (payload: { cvId: number; data: CvUpdate }) => {
      const { cvId, data } = payload;

      const res = await cvService.patch(cvId, data);
      return res.data;
    },
    onSuccess: (_updatedCv, payload) => {
      const { cvId } = payload;

      queryClient.invalidateQueries({ queryKey: ["cvs"] });
      queryClient.invalidateQueries({ queryKey: ["cvs-paginated"] });
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId] });

      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "CV updated",
        message: `Your CV has been updated successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update CV",
        message: "There was an error updating your CV.",
        color: "red",
      });
      console.error("Failed to update CV", err);
    },
  });
};
