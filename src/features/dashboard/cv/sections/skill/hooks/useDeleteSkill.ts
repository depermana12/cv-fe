import { useMutation } from "@tanstack/react-query";
import { skillService } from "../services/skillService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteSkill = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      skillId,
    }: {
      cvId: number;
      skillId: number;
    }) => {
      const res = await skillService.delete(cvId, skillId);
      return res.data;
    },
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({ queryKey: ["cvs", cvId, "skills"] });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete skill",
        message: "There was an error deleting the skill.",
        color: "red",
      });
      console.error("Failed to delete skill", err);
    },
  });
};
