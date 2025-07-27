import { z } from "zod";
import {
  cvSchema,
  cvCreateSchema,
  cvUpdateSchema,
  cvQueryOptionsSchema,
  cvStatsSchema,
  cvSlugParamsSchema,
} from "../schema/cv.schema";

export type Cv = z.infer<typeof cvSchema>;
export type CvCreate = z.infer<typeof cvCreateSchema>;
export type CvUpdate = z.infer<typeof cvUpdateSchema>;
export type CvQueryOptions = z.infer<typeof cvQueryOptionsSchema>;
export type CvStats = z.infer<typeof cvStatsSchema>;
export type CvSlugParams = z.infer<typeof cvSlugParamsSchema>;

export type CvStore = {
  activeCvId: number | null;
  setActiveCvId: (id: number) => void;
  clearActiveCvId: () => void;
};

export type CvFormProps = {
  opened: boolean;
  onClose: () => void;
  initialData?: Partial<CvCreate> & { id?: number };
  mode?: "create" | "edit";
};

export type CvListResponse = {
  success: boolean;
  message: string;
  data: Cv[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
};

// ** CV Section Types **

export type SectionType =
  | "contact"
  | "education"
  | "work"
  | "skill"
  | "project"
  | "organization"
  | "course"
  | "language";

export type Section = {
  id: SectionType;
  name: string;
  description: string;
  icon: React.ReactNode;
};

export type SectionCardProps = {
  section: Section;
  variant: "selected" | "available";
  onRemove?: () => void;
  onClick?: () => void;
};

export type SortableSectionCardProps = {
  section: Section;
  onRemove: (sectionId: SectionType) => void;
};
