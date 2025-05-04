import { useMutation } from "@tanstack/react-query";
import { profileService } from "../services/personalService";
import { PersonalForm } from "../types/types";

// TODO: add mantine notification
export const useUpdatePersonal = () => {
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & PersonalForm) => {
      const res = await profileService.patch(id, data);
      return res.data.data;
    },
    onSuccess: () => {
      console.log("Personal info upadated");
    },
    onError: (err) => {
      console.error("Failed to update personal info", err);
    },
  });
};
