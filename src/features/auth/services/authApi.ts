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

  signUp<T>(inputData: SignUp): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/signup`,
      inputData,
    );
  }

  signIn<T>(inputData: SignIn): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/signin`,
      inputData,
    );
  }

  forgetPassword<T>(
    inputData: ForgetPassword,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/forget-password`,
      inputData,
    );
  }
  resetPassword<T>(
    token: string,
    newPassword: ResetPassword,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/reset-password/${token}`,
      newPassword,
    );
  }
  verifyEmail<T>(token: string): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/verify-email/${token}`,
    );
  }
  emailVerificationStatus<T>(
    userId: number,
  ): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.get<AuthApiResponse<T>>(
      `${this.base}/email-verification-status/${userId}`,
    );
  }
  sendEmailVerification<T>(): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(
      `${this.base}/send-email-verification`,
    );
  }
  refreshToken<T>(): Promise<AxiosResponse<AuthApiResponse<T>>> {
    return axiosClient.post<AuthApiResponse<T>>(`${this.base}/refresh-token`);
  }
}
