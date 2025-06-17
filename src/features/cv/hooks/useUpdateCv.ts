import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { cvApi } from "../services/CvApi";
import type { CvUpdate } from "../types/types";
import { notifications } from "@mantine/notifications";

export const useUpdateCv = () => {
  return useMutation({
    mutationFn: async (variables: { id: number; data: CvUpdate }) => {
      const res = await cvApi.patch(variables.id, variables.data);
      return res.data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cvs"] });
      queryClient.invalidateQueries({ queryKey: ["cvs", variables.id] });
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
