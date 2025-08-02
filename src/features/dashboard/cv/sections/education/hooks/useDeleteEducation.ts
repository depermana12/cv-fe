import { useMutation } from "@tanstack/react-query";
import { educationService } from "../services/educationService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteEducation = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      educationId,
    }: {
      cvId: number;
      educationId: number;
    }) => {
      const res = await educationService.delete(cvId, educationId);
      return res.data;
    },
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "educations"] });
    },
    onError: (err) => {
      notifications.show({
        withCloseButton: true,
        title: "Failed to delete education",
        message: "There was an error deleting the education.",
        color: "red",
      });
      console.error("Failed to delete education", err);
    },
  });
};
