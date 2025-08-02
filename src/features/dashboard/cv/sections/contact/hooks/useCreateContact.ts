import { useMutation } from "@tanstack/react-query";
import { contactService } from "../services/contactService";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";
import { ContactInsert } from "../types/contact.types";

export const useCreateContact = () => {
  return useMutation({
    mutationFn: async ({
      cvId,
      data,
    }: {
      cvId: number;
      data: ContactInsert;
    }) => {
      const res = await contactService.post(cvId, data);
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
        title: "Failed to create contact",
        message: "There was an error creating your contact.",
        color: "red",
      });
      console.error("Failed to create contact", err);
    },
  });
};
