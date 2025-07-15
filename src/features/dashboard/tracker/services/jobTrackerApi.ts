import { AxiosResponse } from "axios";
import { axiosClient } from "../../../../lib/axiosClient";
import {
  JobApplicationsResponse,
  JobApplicationStatusResponse,
  JobTracker,
  JobTrackerCreate,
  JobTrackerQueryOptions,
} from "../types/jobTracker.type";
import { ResourceApi } from "../../../../api/ResourceApi";

export class jobTrackerApi extends ResourceApi<JobTracker, JobTrackerCreate> {
  constructor() {
    super("/applications-tracking");
  }
  async getAllwithPagination(
    options?: JobTrackerQueryOptions,
  ): Promise<AxiosResponse<JobApplicationsResponse>> {
    // For now, just fetch all data - TanStack Table handles client-side pagination/filtering
    // TODO: Add server-side pagination when backend is fixed
    // backend is fixed brow
    const url = `${this.resource}`;
    return axiosClient.get<JobApplicationsResponse>(url, {
      params: options,
    });
  }

  async getStatusTimeline(applicationId: number) {
    const url = `${this.resource}/${applicationId}/statuses`;
    return axiosClient.get<JobApplicationStatusResponse>(url);
  }
}
