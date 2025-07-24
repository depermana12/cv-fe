import { useMutation } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";
import type { OrganizationInsert } from "../types/organization.types";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useCreateOrganization = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      data,
    }: {
      cvId: number;
      data: OrganizationInsert;
    }) => {
      const res = await organizationService.post(cvId, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", "organizations", data.cvId],
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save organization",
        message: "There was an error saving your organization.",
        color: "red",
      });
      console.error("Failed to save organization", err);
    },
  });
};
