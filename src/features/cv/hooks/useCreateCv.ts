import { queryClient } from "../../../lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { cvApi } from "../services/CvApi";
import type { CvCreate } from "../types/types";
import { notifications } from "@mantine/notifications";
import { useCvStore } from "../store/cvStore";

export const useCreateCv = () => {
  const { setActiveCvId } = useCvStore();

  return useMutation({
    mutationFn: async (data: CvCreate) => {
      const res = await cvApi.post(data);
      return res.data.data;
    },
    onSuccess: (newCv) => {
      queryClient.invalidateQueries({ queryKey: ["cvs"] });
      setActiveCvId(newCv.id);

      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "CV created",
        message: `Your CV "${newCv.title}" has been created successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to create CV",
        message: err?.message || "There was an error creating your CV.",
        color: "red",
      });
      console.error("Failed to create CV", err);
    },
  });
};
