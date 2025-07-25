import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { cvService } from "../services/cvService";

export const useDeleteCv = () => {
  return useMutation({
    mutationFn: async (cvId: number) => {
      const res = await cvService.delete(cvId);
      return res.data;
    },
    onSuccess: (_data, cvId) => {
      queryClient.invalidateQueries({ queryKey: ["cvs"] });
      queryClient.invalidateQueries({ queryKey: ["cvs-paginated"] });
      queryClient.removeQueries({ queryKey: ["cv", cvId] });
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "CV deleted",
        message: "Your CV has been deleted successfully.",
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete CV",
        message: "There was an error deleting your CV.",
        color: "red",
      });
      console.error("Failed to delete CV", err);
    },
  });
};
