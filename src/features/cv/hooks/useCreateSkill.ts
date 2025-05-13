import { useMutation } from "@tanstack/react-query";
import { SkillForm } from "../types/types";
import { skillService } from "../services/skillService";
import { notifications } from "@mantine/notifications";

export const useCreateSkill = () => {
  return useMutation({
    mutationFn: async (skillInput: SkillForm) => {
      const res = await skillService.post(skillInput);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Skill info saved",
        message: `Your skill information for ${data.name} has been saved successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save skill info",
        message: "There was an error saving your skill information.",
        color: "red",
      });
      console.error("Failed to save skill info", err);
    },
  });
};
