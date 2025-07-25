import { ResourceApi } from "@shared/api/ResourceApi";
import { axiosClient } from "@shared/lib/axiosClient";
import {
  CheckUsername,
  UserStats,
  UserCredentialsUpdate,
  UserPreferencesUpdate,
} from "../types/user.types";
import { ApiResponse } from "@shared/types/type";

export class UserApi<T, I> extends ResourceApi<T, I> {
  constructor() {
    super("/users");
  }

  async getMe(): Promise<ApiResponse<T>> {
    const res = await axiosClient.get<ApiResponse<T>>(`${this.resource}/me`);
    return res.data;
  }

  async getMyStats(): Promise<ApiResponse<UserStats>> {
    const res = await axiosClient.get<ApiResponse<UserStats>>(
      `${this.resource}/me/stats`,
    );
    return res.data;
  }

  async updateMe(data: Partial<I>): Promise<ApiResponse<T>> {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/me`,
      data,
    );
    return res.data;
  }

  // Update user credentials
  async updateMyCredentials(
    data: UserCredentialsUpdate,
  ): Promise<ApiResponse<T>> {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/me/credentials`,
      data,
    );
    return res.data;
  }

  // Update user preferences
  async updateMyPreferences(
    data: UserPreferencesUpdate,
  ): Promise<ApiResponse<T>> {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/me/preferences`,
      data,
    );
    return res.data;
  }

  // lookup
  async checkUsername(username: string): Promise<ApiResponse<CheckUsername>> {
    const res = await axiosClient.get<ApiResponse<CheckUsername>>(
      `${this.resource}/check-username/${username}`,
    );
    return res.data;
  }

  async getMyEmailVerificationStatus(): Promise<
    ApiResponse<{ verified: boolean }>
  > {
    const res = await axiosClient.get<ApiResponse<{ verified: boolean }>>(
      `${this.resource}/me/email-verification-status`,
    );
    return res.data;
  }
}
