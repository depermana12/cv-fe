import {
  IconUser,
  IconSchool,
  IconBriefcase,
  IconBulb,
  IconCode,
  IconBuilding,
  IconCertificate,
  IconWorld,
} from "@tabler/icons-react";
import { Section } from "../../../types/types";

export const ALL_SECTIONS: Section[] = [
  {
    id: "contact",
    name: "Contact",
    description: "Your personal contact details",
    icon: <IconUser size={24} />,
  },
  {
    id: "education",
    name: "Education",
    description: "Your educational background",
    icon: <IconSchool size={24} />,
  },
  {
    id: "work",
    name: "Work",
    description: "Your professional work experience",
    icon: <IconBriefcase size={24} />,
  },
  {
    id: "skill",
    name: "Skills",
    description: "Your technical and soft skills",
    icon: <IconBulb size={24} />,
  },
  {
    id: "project",
    name: "Projects",
    description: "Your personal and professional projects",
    icon: <IconCode size={24} />,
  },
  {
    id: "organization",
    name: "Organizations",
    description: "Professional organizations and clubs",
    icon: <IconBuilding size={24} />,
  },
  {
    id: "course",
    name: "Courses & Certifications",
    description: "Additional courses and certifications",
    icon: <IconCertificate size={24} />,
  },
  {
    id: "language",
    name: "Languages",
    description: "Languages you speak",
    icon: <IconWorld size={24} />,
  },
];

export const SECTION_MAP = new Map(ALL_SECTIONS.map((s) => [s.id, s]));
