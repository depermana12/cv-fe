import { useQuery } from "@tanstack/react-query";
import { contactQuery, contactsQuery } from "./query";

export const useContact = (cvId: number, contactId: number) =>
  useQuery(contactQuery(cvId, contactId));

export const useContacts = (cvId: number) => useQuery(contactsQuery(cvId));
