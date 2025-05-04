import { useMutation } from "@tanstack/react-query";
import { profileService } from "../services/personalService";
import { PersonalForm } from "../types/types";

//TODO : add mantine notification
export const useCreatePersonal = () => {
  return useMutation({
    mutationFn: async (personalInput: PersonalForm) => {
      const res = await profileService.post(personalInput);
      return res.data.data;
    },
    onSuccess: () => {
      console.log("Personal info saved");
    },
    onError: (err) => {
      console.error("Failed to save personal info", err);
    },
  });
};
