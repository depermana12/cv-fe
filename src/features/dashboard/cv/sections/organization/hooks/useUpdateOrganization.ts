import { useMutation } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { OrganizationUpdate } from "../types/organization.types";

export const useUpdateOrganization = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      organizationId,
      data,
    }: {
      cvId: number;
      organizationId: number;
      data: OrganizationUpdate;
    }) => {
      const res = await organizationService.patch(cvId, organizationId, data);
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
        title: "Failed to update organization",
        message: "There was an error updating the organization.",
        color: "red",
      });
      console.error("Failed to update organization", err);
    },
  });
};
