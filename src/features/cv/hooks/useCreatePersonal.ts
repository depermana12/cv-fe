import { useMutation } from "@tanstack/react-query";
import { profileService } from "../services/personalService";
import { PersonalForm } from "../types/types";

export const useCreatePersonal = () => {
  return useMutation({
    mutationFn: async (personalInput: PersonalForm) =>
      await profileService.post(personalInput),

    onSuccess: () => {
      console.log("Personal info saved");
    },
    onError: (err) => {
      console.error("Failed to save personal info", err);
    },
  });
};
