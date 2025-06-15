import { axiosClient } from "@lib/axiosClient";
import {
  ResetPassword,
  ForgetPassword,
  SignIn,
  SignUp,
} from "../types/auth.schema";
import { AuthApiResponse } from "../types/types";
import { AxiosResponse } from "axios";

export class AuthApi {
  private base = "/auth";

  async signUp<T>(
    inputData: SignUp,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/signup`,
      inputData,
    );
  }

  async signIn<T>(
    inputData: SignIn,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/signin`,
      inputData,
    );
  }

  async forgetPassword<T>(
    inputData: ForgetPassword,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/forget-password`,
      inputData,
    );
  }
  async resetPassword<T>(
    token: string,
    newPassword: ResetPassword,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/reset-password/${token}`,
      newPassword,
    );
  }
  async verifyEmail<T>(
    token: string,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/verify-email/${token}`,
    );
  }
  async emailVerificationStatus<T>(
    userId: number,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.get<AuthApiResponse<T>>(
      `${this.base}/email-verification-status/${userId}`,
    );
  }
  async sendEmailVerification<T>(): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/send-email-verification`,
    );
  }
  async refreshToken<T>(): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(`${this.base}/refresh-token`);
  }
}
