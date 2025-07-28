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
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Education updated successfully",
        message: "Education has been updated successfully.",
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update education",
        message: "There was an error updating the education.",
        color: "red",
      });
      console.error("Failed to update education", err);
    },
  });
};
