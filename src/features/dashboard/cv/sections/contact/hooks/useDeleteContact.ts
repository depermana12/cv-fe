import { useMutation } from "@tanstack/react-query";
import { contactService } from "../services/contactService";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      contactId,
    }: {
      cvId: number;
      contactId: number;
    }) => {
      const res = await contactService.delete(cvId, contactId);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cvs", variables.cvId, "contacts"],
      });
    },
    onError: (err) => {
      notifications.show({
        withCloseButton: true,
        title: "Failed to delete contact",
        message: "There was an error deleting your contact.",
        color: "red",
      });
      console.error("Failed to delete contact", err);
    },
  });
};
