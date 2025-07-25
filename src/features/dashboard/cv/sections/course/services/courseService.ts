import { SubResourceApi } from "@/shared/api/SubResourceApi";
import { Course, CourseInsert } from "../types/course.types";

export const courseService = new SubResourceApi<Course, CourseInsert>(
  "courses",
);
