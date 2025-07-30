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
  /*
   * USER PROFILE
   * This section includes methods for user profile such as:
   * getting user information, getting user stats
   */

  // Profile
  async getMe(): Promise<ApiResponse<T>> {
    const res = await axiosClient.get<ApiResponse<T>>(`${this.resource}/me`);
    return res.data;
  }

  // Stats
  async getMyStats(): Promise<ApiResponse<UserStats>> {
    const res = await axiosClient.get<ApiResponse<UserStats>>(
      `${this.resource}/me/stats`,
    );
    return res.data;
  }

  /*
   * USER MANAGEMENT
   * This section includes methods for user management such as:
   * updating profile, preferences, credentials, deleting account,
   */

  // Update Profile
  async updateMe(data: Partial<I>): Promise<ApiResponse<T>> {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/me`,
      data,
    );
    return res.data;
  }

  // Preferences
  async updateMyPreferences(
    data: UserPreferencesUpdate,
  ): Promise<ApiResponse<T>> {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/me/preferences`,
      data,
    );
    return res.data;
  }

  // Credentials
  async updateMyCredentials(
    data: UserCredentialsUpdate,
  ): Promise<ApiResponse<T>> {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/me/credentials`,
      data,
    );
    return res.data;
  }

  /*
   * USER LOOKUP
   * This section includes methods for user lookup such as:
   * checking username availability, email verification status
   */

  // Lookup
  async checkUsername(username: string): Promise<ApiResponse<CheckUsername>> {
    const res = await axiosClient.get<ApiResponse<CheckUsername>>(
      `${this.resource}/check-username/${username}`,
    );
    return res.data;
  }

  // Email Verification
  async getMyEmailVerificationStatus(): Promise<
    ApiResponse<{ verified: boolean }>
  > {
    const res = await axiosClient.get<ApiResponse<{ verified: boolean }>>(
      `${this.resource}/me/email-verification-status`,
    );
    return res.data;
  }
}
