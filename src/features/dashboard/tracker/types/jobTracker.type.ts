import { z } from "zod";
import {
  jobTrackerCreateSchema,
  jobTrackerImportSchema,
  jobTrackerQueryOptionsSchema,
  jobTrackerSchema,
  jobTrackerUpdateSchema,
} from "../schema/jobTracker";

export type JobTracker = z.infer<typeof jobTrackerSchema>;
export type JobTrackerImport = z.infer<typeof jobTrackerImportSchema>;
export type JobTrackerCreate = z.infer<typeof jobTrackerCreateSchema>;
export type JobTrackerUpdate = Partial<z.infer<typeof jobTrackerUpdateSchema>>;
export type JobTrackerQueryOptions = z.infer<
  typeof jobTrackerQueryOptionsSchema
>;

export type JobApplicationResponse = {
  success: boolean;
  message: string;
  data: JobTracker;
};

export type JobApplicationsResponse = {
  success: boolean;
  message: string;
  data: JobTracker[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
};

export type JobApplicationsTableProps = {
  applications: JobTracker[];
  loading?: boolean;
  onEdit: (application: JobTracker) => void;
  onDelete: (application: JobTracker) => void;
  onCreateNew: () => void;
};

export type JobApplicationFormProps = {
  opened: boolean;
  onClose: () => void;
  initialData?: Partial<JobTrackerCreate>;
  mode?: "create" | "edit";
};

export type DeleteJobApplicationProps = {
  opened: boolean;
  onClose: () => void;
  application: JobTracker | null;
};
