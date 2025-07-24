import { SubResourceApi } from "@shared/api/SubResourceApi";
import type { Skill, SkillInsert } from "../types/skill.types";

export const skillService = new SubResourceApi<Skill, SkillInsert>("skills");
