import { useMutation } from "@tanstack/react-query";
import { softSkillService } from "../services/softSkillService";
import { SoftSkillForm } from "../types/types";
import { notifications } from "@mantine/notifications";

export const useCreateSoftSkill = () => {
  return useMutation({
    mutationFn: async (softSkillInput: SoftSkillForm) => {
      const res = await softSkillService.post(softSkillInput);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Soft Skill info saved",
        message: `Your soft skill information for ${data.category} has been saved successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save soft skill info",
        message: "There was an error saving your soft skill information.",
        color: "red",
      });
      console.error("Failed to save soft skill info", err);
    },
  });
};
