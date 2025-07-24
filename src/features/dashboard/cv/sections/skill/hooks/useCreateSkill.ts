import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { queryClient } from "@shared/lib/queryClient";
import type { SkillInsert } from "../types/skill.types";
import { skillService } from "../services/skillService";

export const useCreateSkill = () => {
  return useMutation({
    mutationFn: async ({ cvId, data }: { cvId: number; data: SkillInsert }) => {
      const res = await skillService.post(cvId, data);
      return res.data;
    },
    onMutate: async ({ cvId, data: newSkill }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["cvs", cvId, "skills"] });

      // Snapshot the previous value
      const previousSkills =
        queryClient.getQueryData<SkillInsert[]>(["cvs", cvId, "skills"]) || [];

      // Optimistically update to the new value
      queryClient.setQueryData<SkillInsert[]>(
        ["cvs", cvId, "skills"],
        (old) => {
          if (old) {
            return [...old, newSkill];
          }
          return [newSkill];
        },
      );

      // Return a context object with the snapshotted value
      return { previousSkills, cvId };
    },
    onSettled: (_, __, variables) => {
      // Refetch the skills list after error/success mutation
      queryClient.invalidateQueries({
        queryKey: ["cvs", variables.cvId, "skills"],
      });
    },
    onError: (err, _, context) => {
      if (context) {
        queryClient.setQueryData(
          ["cvs", context.cvId, "skills"],
          context.previousSkills,
        );
      }
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
