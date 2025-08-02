import { useMutation } from "@tanstack/react-query";
import { educationService } from "../services/educationService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { EducationUpdate } from "../types/education.types";

export const useUpdateEducation = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      educationId,
      data,
    }: {
      cvId: number;
      educationId: number;
      data: EducationUpdate;
    }) => {
      const res = await educationService.patch(cvId, educationId, data);
      return res.data;
    },
    onSuccess: (_data, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "educations"] });
    },
    onError: (err) => {
      notifications.show({
        withCloseButton: true,
        title: "Failed to update education",
        message: "There was an error updating the education.",
        color: "red",
      });
      console.error("Failed to update education", err);
    },
  });
};
