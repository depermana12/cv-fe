import { useQuery } from "@tanstack/react-query";
import { skillQuery, skillsQuery } from "./query";

export const useSkill = (cvId: number, skillId: number) =>
  useQuery(skillQuery(cvId, skillId));

export const useSkills = (cvId: number) => useQuery(skillsQuery(cvId));
