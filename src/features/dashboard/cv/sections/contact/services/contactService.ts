import { SubResourceApi } from "@shared/api/SubResourceApi";
import { Contact, ContactInsert } from "../types/contact.types";

export const contactService = new SubResourceApi<Contact, ContactInsert>(
  "contacts",
);
