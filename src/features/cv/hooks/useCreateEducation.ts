import { useMutation } from "@tanstack/react-query";
import { educationService } from "../services/educationService";
import type { EducationForm } from "../types/types";

// TODO: add Mantine notifications
export const useCreateEducation = () => {
  return useMutation({
    mutationFn: async (educationInput: EducationForm) => {
      const res = await educationService.post(educationInput);
      return res.data.data;
    },
    onSuccess: () => {
      console.log("Education info saved");
    },
    onError: (err) => {
      console.error("Failed to save education info", err);
    },
  });
};
