import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { cvApi } from "../services/CvApi";
import type { CvUpdate } from "../types/types";
import { notifications } from "@mantine/notifications";

export const useUpdateCv = () => {
  return useMutation({
    mutationFn: async (payload: { cvId: number; data: CvUpdate }) => {
      const { cvId, data } = payload;

      const res = await cvApi.patch(cvId, data);
      return res.data.data;
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
