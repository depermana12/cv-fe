import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { educationService } from "../services/educationService";
import type { EducationForm } from "../types/types";
import { notifications } from "@mantine/notifications";

export const useCreateEducation = () => {
  return useMutation({
    mutationFn: async (educationInput: EducationForm) => {
      const res = await educationService.post(educationInput);
      return res.data.data;
    },
    onMutate: async (newEducation) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["education"] });

      // snapshot the previous value
      const previousEducation =
        queryClient.getQueryData<EducationForm[]>(["education"]) || [];

      // optimistically update to the new value
      queryClient.setQueryData<EducationForm[]>(["education"], (old) => {
        if (old) {
          return [...old, newEducation];
        }
        return [newEducation];
      });

      // return a context object with the snapshotted value
      return { previousEducation };
    },
    onSettled: () => {
      // refetch the education list after error/success mutation
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: `Education ${data.degree} added`,
        message: `You have successfully added ${data.fieldOfStudy} to your education list`,
        color: "green",
      });
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["education"], context?.previousEducation);
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to add education",
        message: "There was an error adding your education.",
        color: "red",
      });
      console.error("Failed to add education", err);
    },
  });
};
