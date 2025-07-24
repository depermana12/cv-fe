import { useMutation } from "@tanstack/react-query";
import { skillService } from "../services/skillService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { SkillUpdate } from "../types/skill.types";

export const useUpdateSkill = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      skillId,
      data,
    }: {
      cvId: number;
      skillId: number;
      data: SkillUpdate;
    }) => {
      const res = await skillService.patch(cvId, skillId, data);
      return res.data;
    },
    onSuccess: (_data, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "skills"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update skill",
        message: "There was an error updating the skill.",
        color: "red",
      });
      console.error("Failed to update skill", err);
    },
  });
};
