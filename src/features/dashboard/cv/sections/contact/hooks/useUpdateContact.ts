import { useMutation } from "@tanstack/react-query";
import { ContactUpdate } from "../types/contact.types";
import { contactService } from "../services/contactService";
import { queryClient } from "@/shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useUpdateContact = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      contactId,
      data,
    }: {
      cvId: number;
      contactId: number;
      data: ContactUpdate;
    }) => {
      const res = await contactService.patch(cvId, contactId, data);
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
        title: "Failed to update contact",
        message: "There was an error updating your contact.",
        color: "red",
      });
      console.error("Failed to update contact", err);
    },
  });
};
