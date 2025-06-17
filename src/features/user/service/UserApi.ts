import { ResourceApi } from "../../../api/ResourceApi";
import { axiosClient } from "../../../lib/axiosClient";
import { AxiosResponse } from "axios";
import { CheckUsername, UserStats } from "../schema/user";
import { ApiResponse } from "../../types/types";

export class UserApi<T, I> extends ResourceApi<T, I> {
  constructor() {
    super("/users");
  }

  async getMe(): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.get<ApiResponse<T>>(`${this.resource}/me`);
  }

  async getMyStats(): Promise<AxiosResponse<ApiResponse<UserStats>>> {
    return axiosClient.get<ApiResponse<UserStats>>(`${this.resource}/me/stats`);
  }

  async updateMe(data: Partial<I>): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.patch<ApiResponse<T>>(`${this.resource}/me`, data);
  }

  async checkUsername(
    username: string,
  ): Promise<AxiosResponse<ApiResponse<CheckUsername>>> {
    return axiosClient.get<ApiResponse<CheckUsername>>(
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
