import { z } from "zod";
import { cvQueryOptionsSchema } from "../schema/cv.schema";

export type Cv = {
  id: number;
  userId: number;
  title: string;
  description: string;
  theme: string;
  isPublic: boolean;
  slug: string;
  views: number;
  downloads: number;
  language: string;
  createdAt: string;
  updatedAt: string;
};

export type CvCreate = {
  title: string;
  description: string;
  theme?: string;
  isPublic?: boolean;
  slug?: string;
  language?: string;
};

export type CvUpdate = Partial<CvCreate>;

export type CvQueryOptions = z.infer<typeof cvQueryOptionsSchema>;

export type CvPaginatedResponse = {
  data: Cv[];
  total: number;
  limit: number;
  offset: number;
};

export type CvStore = {
  activeCvId: number | null;
  setActiveCvId: (id: number) => void;
  clearActiveCvId: () => void;
};

export type CvFormProps = {
  opened: boolean;
  onClose: () => void;
  initialData?: Partial<CvCreate>;
  mode?: "create" | "edit";
};
