import { z } from "zod";
import {
  contactCreateSchema,
  contactSchema,
  contactUpdateSchema,
} from "../schema/contactSchema";

export type Contact = z.infer<typeof contactSchema>;
export type ContactInsert = z.infer<typeof contactCreateSchema>;
export type ContactUpdate = z.infer<typeof contactUpdateSchema>;

export type ContactFormMode = "create" | "edit";

export type ContactFormProps = {
  mode: ContactFormMode;
  initialData?: Contact;
  onSuccess?: () => void;
};
