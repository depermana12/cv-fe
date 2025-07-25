import { ResourceApi } from "@shared/api/ResourceApi";
import {
  Cv,
  CvCreate,
  CvQueryOptions,
  CvListResponse,
  CvStats,
} from "../types/types";
import { axiosClient } from "@shared/lib/axiosClient";
import { ApiResponse } from "@/shared/types/type";

export class CvApi extends ResourceApi<Cv, CvCreate> {
  constructor() {
    super("/cvs");
  }

  async getAllWithPagination(
    options?: CvQueryOptions,
  ): Promise<CvListResponse> {
    const res = await axiosClient.get<CvListResponse>(this.resource, {
      params: options,
    });
    return res.data;
  }

  async getMeStats() {
    const res = await axiosClient.get<ApiResponse<CvStats>>(
      `${this.resource}/me/stats`,
    );
    return res.data;
  }

  async getByUsernameAndSlug(username: string, slug: string) {
    const res = await axiosClient.get<ApiResponse<Cv>>(
      `${this.resource}/${username}/${slug}`,
    );
    return res.data;
  }

  async slugExists(slug: string, excludeCvId?: number) {
    const res = await axiosClient.get<
      ApiResponse<{
        available: boolean;
        slug: string;
      }>
    >(`${this.resource}/check-slug-availability`, {
      params: { slug, ...(excludeCvId && { excludeCvId }) },
    });
    return res.data;
  }
}
