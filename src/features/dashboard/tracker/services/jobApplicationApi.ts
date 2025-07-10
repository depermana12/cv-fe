import { AxiosResponse } from "axios";
import { axiosClient } from "../../../../lib/axiosClient";
import {
  JobApplicationsResponse,
  JobTracker,
  JobTrackerCreate,
} from "../types/jobTracker.type";
import { ResourceApi } from "../../../../api/ResourceApi";

export class jobTrackerApi extends ResourceApi<JobTracker, JobTrackerCreate> {
  constructor() {
    super("/applications-tracking");
  }
  async getAllwithPagination(): Promise<
    AxiosResponse<JobApplicationsResponse>
  > {
    // For now, just fetch all data - TanStack Table handles client-side pagination/filtering
    // TODO: Add server-side pagination when backend is fixed
    const url = `${this.resource}`;
    return axiosClient.get<JobApplicationsResponse>(url);
  }
}
