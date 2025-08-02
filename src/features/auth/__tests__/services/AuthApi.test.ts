import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuthApi } from "../../services/AuthApi";
import { axiosClient } from "@shared/lib/axiosClient";

// Mock the axios client
vi.mock("@shared/lib/axiosClient", () => ({
  axiosClient: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

const mockedAxiosClient = vi.mocked(axiosClient);

describe("AuthApi", () => {
  let authApi: AuthApi;

  beforeEach(() => {
    authApi = new AuthApi();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("signUp", () => {
    it("should make POST request to signup endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: 1,
            username: "testuser",
            email: "test@example.com",
            token: "mock-token",
            isEmailVerified: false,
          },
          message: "User created successfully",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const signUpData = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      const result = await authApi.signUp(signUpData);

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/signup",
        signUpData,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle signup error", async () => {
      const errorResponse = new Error("Email already exists");
      mockedAxiosClient.post.mockRejectedValueOnce(errorResponse);

      const signUpData = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      await expect(authApi.signUp(signUpData)).rejects.toThrow(
        "Email already exists",
      );
      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/signup",
        signUpData,
      );
    });
  });

  describe("signIn", () => {
    it("should make POST request to signin endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: 1,
            username: "testuser",
            email: "test@example.com",
            token: "mock-token",
            isEmailVerified: true,
          },
          message: "Login successful",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const signInData = {
        email: "test@example.com",
        password: "Password123!",
      };

      const result = await authApi.signIn(signInData);

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/signin",
        signInData,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle signin error", async () => {
      const errorResponse = new Error("Invalid credentials");
      mockedAxiosClient.post.mockRejectedValueOnce(errorResponse);

      const signInData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      await expect(authApi.signIn(signInData)).rejects.toThrow(
        "Invalid credentials",
      );
      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/signin",
        signInData,
      );
    });
  });

  describe("forgetPassword", () => {
    it("should make POST request to forget-password endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Password reset email sent",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const forgetPasswordData = {
        email: "test@example.com",
      };

      const result = await authApi.forgetPassword(forgetPasswordData);

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/forget-password",
        forgetPasswordData,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle forget password error", async () => {
      const errorResponse = new Error("Email not found");
      mockedAxiosClient.post.mockRejectedValueOnce(errorResponse);

      const forgetPasswordData = {
        email: "nonexistent@example.com",
      };

      await expect(authApi.forgetPassword(forgetPasswordData)).rejects.toThrow(
        "Email not found",
      );
    });
  });

  describe("resetPassword", () => {
    it("should make POST request to reset-password endpoint with token", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Password reset successful",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const token = "reset-token-123";
      const resetPasswordData = {
        password: "NewPassword123!",
        confirmPassword: "NewPassword123!",
      };

      const result = await authApi.resetPassword(token, resetPasswordData);

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        `/auth/reset-password/${token}`,
        resetPasswordData,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle reset password error", async () => {
      const errorResponse = new Error("Invalid or expired token");
      mockedAxiosClient.post.mockRejectedValueOnce(errorResponse);

      const token = "invalid-token";
      const resetPasswordData = {
        password: "NewPassword123!",
        confirmPassword: "NewPassword123!",
      };

      await expect(
        authApi.resetPassword(token, resetPasswordData),
      ).rejects.toThrow("Invalid or expired token");
    });
  });

  describe("verifyEmail", () => {
    it("should make POST request to verify-email endpoint with token", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Email verified successfully",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const token = "verify-token-123";
      const result = await authApi.verifyEmail(token);

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        `/auth/verify-email/${token}`,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle verify email error", async () => {
      const errorResponse = new Error("Invalid verification token");
      mockedAxiosClient.post.mockRejectedValueOnce(errorResponse);

      const token = "invalid-token";

      await expect(authApi.verifyEmail(token)).rejects.toThrow(
        "Invalid verification token",
      );
    });
  });

  describe("sendEmailVerification", () => {
    it("should make POST request to send-email-verification endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          message: "Verification email sent",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const result = await authApi.sendEmailVerification();

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/send-email-verification",
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("refreshToken", () => {
    it("should make POST request to refresh-token endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            token: "new-token-123",
          },
          message: "Token refreshed",
        },
      };

      mockedAxiosClient.post.mockResolvedValueOnce(mockResponse);

      const result = await authApi.refreshToken();

      expect(mockedAxiosClient.post).toHaveBeenCalledWith(
        "/auth/refresh-token",
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getCurrentUser", () => {
    it("should make GET request to users/me endpoint", async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: 1,
            username: "testuser",
            email: "test@example.com",
            isEmailVerified: true,
          },
          message: "User data retrieved",
        },
      };

      mockedAxiosClient.get.mockResolvedValueOnce(mockResponse);

      const result = await authApi.getCurrentUser();

      expect(mockedAxiosClient.get).toHaveBeenCalledWith("/users/me");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle getCurrentUser error", async () => {
      const errorResponse = new Error("Unauthorized");
      mockedAxiosClient.get.mockRejectedValueOnce(errorResponse);

      await expect(authApi.getCurrentUser()).rejects.toThrow("Unauthorized");
    });
  });
});
