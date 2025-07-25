import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import { languageService } from "../services/languageService";
import type { LanguageUpdate } from "../types/language.types";

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cvId,
      languageId,
      data,
    }: {
      cvId: number;
      languageId: number;
      data: LanguageUpdate;
    }) => languageService.patch(cvId, languageId, data),
    onSuccess: (_updated, { cvId }) => {
      queryClient.invalidateQueries({
        queryKey: ["languages", cvId],
      });
    },
    onError: (error) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update language",
        message: "There was an error updating your language.",
        color: "red",
      });
      console.error("Failed to update language", error);
    },
  });
};
