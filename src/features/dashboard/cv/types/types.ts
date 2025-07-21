import { z } from "zod";
import {
  cvSchema,
  cvCreateSchema,
  cvUpdateSchema,
  cvQueryOptionsSchema,
} from "../schema/cv.schema";

export type Cv = z.infer<typeof cvSchema>;
export type CvCreate = z.infer<typeof cvCreateSchema>;
export type CvUpdate = z.infer<typeof cvUpdateSchema>;
export type CvQueryOptions = z.infer<typeof cvQueryOptionsSchema>;

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
