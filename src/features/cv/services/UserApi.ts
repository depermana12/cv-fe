import { ResourceApi } from "../../cv/services/ResourceApi";
import { axiosClient } from "../../../lib/axiosClient";
import type { ApiResponse } from "../types/types";
import { AxiosResponse } from "axios";

export class UserApi<T, I> extends ResourceApi<T, I> {
  constructor() {
    super("/users");
  }

  async getMe(): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.get<ApiResponse<T>>(`${this.resource}/me`);
  }

  async getMyStats(): Promise<AxiosResponse<ApiResponse<any>>> {
    return axiosClient.get<ApiResponse<any>>(`${this.resource}/me/stats`);
  }

  async checkUsername(
    username: string,
  ): Promise<AxiosResponse<ApiResponse<{ available: boolean }>>> {
    return axiosClient.get<ApiResponse<{ available: boolean }>>(
      `${this.resource}/check-username/${username}`,
    );
  }

  async getMyEmailVerificationStatus(): Promise<
    AxiosResponse<ApiResponse<{ verified: boolean }>>
  > {
    return axiosClient.get<ApiResponse<{ verified: boolean }>>(
      `${this.resource}/me/email-verification-status`,
    );
  }
}
