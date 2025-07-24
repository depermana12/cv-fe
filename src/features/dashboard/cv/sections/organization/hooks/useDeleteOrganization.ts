import { useMutation } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteOrganization = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      organizationId,
    }: {
      cvId: number;
      organizationId: number;
    }) => {
      const res = await organizationService.delete(cvId, organizationId);
      return res.data;
    },
    onSuccess: (_deleted, { cvId }) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", cvId, "organizations"],
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to delete organization",
        message: "There was an error deleting the organization.",
        color: "red",
      });
      console.error("Failed to delete organization", err);
    },
  });
};
