import { z } from "zod";
import {
  organizationSchema,
  organizationCreateSchema,
  organizationUpdateSchema,
} from "../schema/organizationSchema";

export type Organization = z.infer<typeof organizationSchema>;
export type OrganizationInsert = z.infer<typeof organizationCreateSchema>;
export type OrganizationUpdate = z.infer<typeof organizationUpdateSchema>;

export type OrganizationFormMode = "create" | "edit";

export type OrganizationFormProps = {
  mode: OrganizationFormMode;
  cvId: number;
  initialData?: Organization;
  onSuccess?: () => void;
};
