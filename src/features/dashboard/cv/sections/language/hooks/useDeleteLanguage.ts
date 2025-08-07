import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import { languageService } from "../services/languageService";

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cvId, languageId }: { cvId: number; languageId: number }) =>
      languageService.delete(cvId, languageId),
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", cvId, "languages"],
      });
    },
    onError: (error: any) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete language",
        message: "There was an error deleting your language.",
        color: "red",
      });
      console.error("Failed to delete language", error);
    },
  });
};
