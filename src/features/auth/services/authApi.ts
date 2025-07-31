import { axiosClient } from "@/shared/lib/axiosClient";
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
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.base}/signup`,
      data,
    );
    return res.data;
  }

  async signIn<T>(data: SignIn): Promise<ApiResponse<T>> {
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.base}/signin`,
      data,
    );
    return res.data;
  }

  async forgetPassword(
    data: ForgetPassword,
  ): Promise<{ success: boolean; message: string }> {
    const res = await axiosClient.post<{
      success: boolean;
      message: string;
    }>(`${this.base}/forget-password`, data);
    return res.data;
  }

  async resetPassword<T>(
    token: string,
    newPassword: ResetPassword,
  ): Promise<ApiResponse<T>> {
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.base}/reset-password/${token}`,
      newPassword,
    );
    return res.data;
  }

  async verifyEmail<T>(token: string): Promise<ApiResponse<T>> {
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.base}/verify-email/${token}`,
    );
    return res.data;
  }

  async emailVerificationStatus<T>(userId: number): Promise<ApiResponse<T>> {
    const res = await axiosClient.get<ApiResponse<T>>(
      `${this.base}/email-verification-status/${userId}`,
    );
    return res.data;
  }

  async sendEmailVerification<T>(): Promise<ApiResponse<T>> {
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.base}/send-email-verification`,
    );
    return res.data;
  }

  async refreshToken<T>(): Promise<ApiResponse<T>> {
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.base}/refresh-token`,
    );
    return res.data;
  }

  async getCurrentUser<T>(): Promise<ApiResponse<T>> {
    const res = await axiosClient.get<ApiResponse<T>>("/users/me");
    return res.data;
  }
}
