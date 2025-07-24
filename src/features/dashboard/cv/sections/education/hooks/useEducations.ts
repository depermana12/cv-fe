import { useQuery } from "@tanstack/react-query";
import { educationQuery, educationsQuery } from "./query";

export const useEducation = (cvId: number, educationId: number) =>
  useQuery(educationQuery(cvId, educationId));

export const useEducations = (cvId: number) => useQuery(educationsQuery(cvId));
