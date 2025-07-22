import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { cvApi } from "../services/CvApi";
import { useCvStore } from "../store/cvStore";
import type { CvCreate } from "../types/types";

export const useCreateCv = () => {
  const { setActiveCvId } = useCvStore();

  return useMutation({
    mutationFn: async (data: CvCreate) => {
      const res = await cvApi.post(data);
      return res.data;
    },
    onSuccess: (newCv) => {
      queryClient.invalidateQueries({ queryKey: ["cvs"] });
      queryClient.invalidateQueries({ queryKey: ["cvs-paginated"] });
      setActiveCvId(newCv.id);
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
