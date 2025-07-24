import { SubResourceApi } from "@shared/api/SubResourceApi";
import { Education, EducationInsert } from "../types/education.types";

export const educationService = new SubResourceApi<Education, EducationInsert>(
  "educations",
);
