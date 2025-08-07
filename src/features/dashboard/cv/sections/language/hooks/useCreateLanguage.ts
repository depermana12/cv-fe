import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { languageService } from "../services/languageService";
import type { LanguageInsert } from "../types/language.types";

export const useCreateLanguage = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      data,
    }: {
      cvId: number;
      data: LanguageInsert;
    }) => {
      const res = await languageService.post(cvId, data);
      return res.data;
    },
    onSuccess: (_data, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "languages"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to add language",
        message: "There was an error adding your language.",
        color: "red",
      });
      console.error("Failed to add language", err);
    },
  });
};
