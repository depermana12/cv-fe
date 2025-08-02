import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { educationService } from "../services/educationService";
import { queryClient } from "@shared/lib/queryClient";
import type { EducationInsert } from "../types/education.types";

export const useCreateEducation = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      data,
    }: {
      cvId: number;
      data: EducationInsert;
    }) => {
      const res = await educationService.post(cvId, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", variables.cvId, "educations"],
      });
    },
    onError: (err) => {
      notifications.show({
        withCloseButton: true,
        title: "Failed to add education",
        message: "There was an error adding your education.",
        color: "red",
      });
      console.error("Failed to add education", err);
    },
  });
};
