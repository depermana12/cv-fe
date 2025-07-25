import { z } from "zod";
import {
  courseSchema,
  courseInsertSchema,
  courseUpdateSchema,
} from "../schema/courseSchema";

export type Course = z.infer<typeof courseSchema>;
export type CourseInsert = z.infer<typeof courseInsertSchema>;
export type CourseUpdate = z.infer<typeof courseUpdateSchema>;

export type CourseFormMode = "create" | "edit";

export type CourseFormProps = {
  mode: CourseFormMode;
  initialData?: Course;
  onSuccess?: () => void;
};
