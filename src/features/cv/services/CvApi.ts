import { AxiosResponse } from "axios";
import { ResourceApi } from "../../../api/ResourceApi";
import {
  Cv,
  CvCreate,
  CvQueryOptions,
  CvPaginatedResponse,
} from "../types/types";
import { ApiResponse, PaginatedApiResponse } from "../../types/types";
import { axiosClient } from "../../../lib/axiosClient";

export class CvApi extends ResourceApi<Cv, CvCreate> {
  constructor() {
    super("/cvs");
  }

  async getAllWithPagination(
    options?: CvQueryOptions,
  ): Promise<AxiosResponse<PaginatedApiResponse<Cv[]>>> {
    const params = new URLSearchParams();

    if (options?.search) {
      params.append("search", options.search);
    }
    if (options?.sortBy) {
      params.append("sortBy", options.sortBy);
    }
    if (options?.sortOrder) {
      params.append("sortOrder", options.sortOrder);
    }
    if (options?.limit) {
      params.append("limit", options.limit.toString());
    }
    if (options?.offset) {
      params.append("offset", options.offset.toString());
    }

    const url = params.toString()
      ? `${this.resource}?${params.toString()}`
      : this.resource;
    return axiosClient.get<PaginatedApiResponse<Cv[]>>(url);
  }
  async getAllPaginated(
    options?: CvQueryOptions,
  ): Promise<AxiosResponse<ApiResponse<CvPaginatedResponse>>> {
    const params = new URLSearchParams();

    if (options?.search) {
      params.append("search", options.search);
    }
    if (options?.sortBy) {
      params.append("sortBy", options.sortBy);
    }
    if (options?.sortOrder) {
      params.append("sortOrder", options.sortOrder);
    }
    if (options?.limit) {
      params.append("limit", options.limit.toString());
    }
    if (options?.offset) {
      params.append("offset", options.offset.toString());
    }

    const url = params.toString()
      ? `${this.resource}/paginated?${params.toString()}`
      : `${this.resource}/paginated`;
    return axiosClient.get<ApiResponse<CvPaginatedResponse>>(url);
  }
}

export const cvApi = new CvApi();
