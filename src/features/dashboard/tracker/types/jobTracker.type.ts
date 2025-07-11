import { z } from "zod";
import {
  jobTrackerCreateSchema,
  jobTrackerQueryOptionsSchema,
  jobTrackerSchema,
  jobTrackerUpdateSchema,
} from "../schema/jobTracker";

export type JobTracker = z.infer<typeof jobTrackerSchema>;
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

export type JobApplicationFormProps = {
  opened: boolean;
  onClose: () => void;
  initialData?: Partial<JobTrackerCreate>;
  mode?: "create" | "edit";
};
