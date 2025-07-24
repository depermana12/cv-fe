import { SubResourceApi } from "@/shared/api/SubResourceApi";
import type {
  Organization,
  OrganizationInsert,
} from "../types/organization.types";

export const organizationService = new SubResourceApi<
  Organization,
  OrganizationInsert
>("organizations");
