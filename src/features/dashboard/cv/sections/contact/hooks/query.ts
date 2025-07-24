import { queryOptions } from "@tanstack/react-query";
import { contactService } from "../services/contactService";

export const contactQuery = (cvId: number, contactId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "contacts", contactId],
    queryFn: async () => {
      const res = await contactService.get(cvId, contactId);
      return res.data;
    },
    enabled: !!cvId && !!contactId,
  });

export const contactsQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "contacts"],
    queryFn: async () => {
      const res = await contactService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
