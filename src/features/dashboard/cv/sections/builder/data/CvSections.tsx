import { Section } from "../../../types/types";

export const ALL_SECTIONS: Section[] = [
  {
    id: "contact",
    name: "Contact",
  },
  {
    id: "education",
    name: "Education",
  },
  {
    id: "work",
    name: "Work",
  },
  {
    id: "skill",
    name: "Skills",
  },
  {
    id: "project",
    name: "Projects",
  },
  {
    id: "organization",
    name: "Organizations",
  },
  {
    id: "course",
    name: "Courses & Certifications",
  },
  {
    id: "language",
    name: "Languages",
  },
];

export const SECTION_MAP = new Map(ALL_SECTIONS.map((s) => [s.id, s]));
