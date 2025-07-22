import { axiosClient } from "@lib/axiosClient";
import {
  ResetPassword,
  ForgetPassword,
  SignIn,
  SignUp,
} from "../schema/auth.schema";
import { ApiResponse } from "@shared/types/type";

export class AuthApi {
  private base = "/auth";

  async signUp<T>(data: SignUp): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(`${this.base}/signup`, data);
  }

  async signIn<T>(data: SignIn): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(`${this.base}/signin`, data);
  }

  async forgetPassword<T>(data: ForgetPassword): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(
      `${this.base}/forget-password`,
      data,
    );
  }

  async resetPassword<T>(
    token: string,
    newPassword: ResetPassword,
  ): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(
      `${this.base}/reset-password/${token}`,
      newPassword,
    );
  }

  async verifyEmail<T>(token: string): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(
      `${this.base}/verify-email/${token}`,
    );
  }

  async emailVerificationStatus<T>(userId: number): Promise<ApiResponse<T>> {
    return axiosClient.get<ApiResponse<T>>(
      `${this.base}/email-verification-status/${userId}`,
    );
  }

  async sendEmailVerification<T>(): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(
      `${this.base}/send-email-verification`,
    );
  }

  async refreshToken<T>(): Promise<ApiResponse<T>> {
    return axiosClient.post<ApiResponse<T>>(`${this.base}/refresh-token`);
  }
}
