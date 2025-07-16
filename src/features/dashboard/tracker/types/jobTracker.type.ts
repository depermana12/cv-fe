import { z } from "zod";
import {
  jobTrackerCreateSchema,
  jobTrackerImportSchema,
  jobTrackerQueryOptionsSchema,
  jobTrackerSchema,
  jobTrackerStatusSchema,
  jobTrackerUpdateSchema,
} from "../schema/jobTracker";

export type JobTracker = z.infer<typeof jobTrackerSchema>;
export type JobTrackerImport = z.infer<typeof jobTrackerImportSchema>;
export type JobTrackerCreate = z.infer<typeof jobTrackerCreateSchema>;
export type JobTrackerUpdate = Partial<
  z.infer<typeof jobTrackerUpdateSchema>
> & {
  statusChangedAt?: Date;
};
export type JobTrackerQueryOptions = z.infer<
  typeof jobTrackerQueryOptionsSchema
>;

export type JobTrackerStatus = z.infer<typeof jobTrackerStatusSchema>;

export type JobApplicationResponse = {
  success: boolean;
  message: string;
  data: JobTracker;
};

export type JobApplicationStatusResponse = {
  success: boolean;
  message: string;
  data: JobTrackerStatus[];
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
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: string | null) => void;
  onEdit: (application: JobTracker) => void;
  onDelete: (application: JobTracker) => void;
  onCreateNew: () => void;
  dateRange?: [Date | null, Date | null];
  onDateRangeChange?: (dateRange: [Date | null, Date | null]) => void;
  searchQuery?: string;
  onSearchChange?: (search: string) => void;
};

export type JobApplicationFormProps =
  | {
      opened: boolean;
      onClose: () => void;
      mode: "create";
      initialData?: Partial<JobTrackerCreate>;
    }
  | {
      opened: boolean;
      onClose: () => void;
      mode: "edit";
      initialData?: JobTracker;
    };

export type DeleteJobApplicationProps = {
  opened: boolean;
  onClose: () => void;
  application: JobTracker | null;
};
