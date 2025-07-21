import { axiosClient } from "@shared/lib/axiosClient";
import {
  JobApplicationsResponse,
  JobApplicationStatusResponse,
  JobTracker,
  JobTrackerCreate,
  JobTrackerQueryOptions,
} from "../types/jobTracker.type";
import { ResourceApi } from "@shared/api/ResourceApi";

export interface IjobTrackerApi {
  getAllwithPagination(
    options?: JobTrackerQueryOptions,
  ): Promise<JobApplicationsResponse>;
  getStatusTimeline(
    applicationId: number,
  ): Promise<JobApplicationStatusResponse>;
}

export class jobTrackerApi
  extends ResourceApi<JobTracker, JobTrackerCreate>
  implements IjobTrackerApi
{
  constructor() {
    super("/applications-tracking");
  }

  async getAllwithPagination(options?: JobTrackerQueryOptions) {
    const url = `${this.resource}`;
    const res = await axiosClient.get<JobApplicationsResponse>(url, {
      params: options,
    });
    return res.data;
  }

  async getStatusTimeline(applicationId: number) {
    const url = `${this.resource}/${applicationId}/statuses`;
    const res = await axiosClient.get<JobApplicationStatusResponse>(url);
    return res.data;
  }
}
