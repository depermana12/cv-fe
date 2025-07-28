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
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Contact updated successfully",
        message: `Contact has been updated.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to update contact",
        message: "There was an error updating your contact.",
        color: "red",
      });
      console.error("Failed to update contact", err);
    },
  });
};
