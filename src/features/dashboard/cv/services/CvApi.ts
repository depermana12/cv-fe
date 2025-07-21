import { ResourceApi } from "@shared/api/ResourceApi";
import { Cv, CvCreate, CvQueryOptions, CvListResponse } from "../types/types";
import { axiosClient } from "@shared/lib/axiosClient";

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
}

export const cvApi = new CvApi();
