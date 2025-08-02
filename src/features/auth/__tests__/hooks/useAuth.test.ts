import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSignIn } from "../../hooks/useSignIn";
import { useSignUp } from "../../hooks/useSignUp";
import { useForgetPassword } from "../../hooks/useForgetPassword";
import { useResetPassword } from "../../hooks/useResetPassword";
import { useAuthStore } from "../../../../app/store/authStore";
import React from "react";

// Mock the auth store
vi.mock("../../../../app/store/authStore", () => ({
  useAuthStore: {
    getState: vi.fn(),
    setState: vi.fn(),
    signIn: vi.fn(),
    signUp: vi.fn(),
  },
}));

// Mock react-router navigate
const mockNavigate = vi.fn();
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock notifications
vi.mock("@mantine/notifications", () => ({
  notifications: {
    show: vi.fn(),
  },
}));

// Mock auth service
vi.mock("../../services/autsService", () => ({
  authService: {
    forgetPassword: vi.fn(),
    resetPassword: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("Auth Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useSignIn", () => {
    it("should sign in user successfully", async () => {
      const mockSignIn = vi.fn().mockResolvedValue(undefined);
      vi.mocked(useAuthStore).getState.mockReturnValue({
        signIn: mockSignIn,
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useSignIn(), { wrapper });

      const signInData = {
        email: "test@example.com",
        password: "Password123!",
      };

      result.current.mutate(signInData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockSignIn).toHaveBeenCalledWith(signInData);
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard/overview" });
    });

    it("should handle sign in error", async () => {
      const mockSignIn = vi
        .fn()
        .mockRejectedValue(new Error("Invalid credentials"));
      vi.mocked(useAuthStore).getState.mockReturnValue({
        signIn: mockSignIn,
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useSignIn(), { wrapper });

      const signInData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      result.current.mutate(signInData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockSignIn).toHaveBeenCalledWith(signInData);
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe("useSignUp", () => {
    it("should sign up user successfully", async () => {
      const mockSignUp = vi.fn().mockResolvedValue(undefined);
      vi.mocked(useAuthStore).getState.mockReturnValue({
        signUp: mockSignUp,
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useSignUp(), { wrapper });

      const signUpData = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      result.current.mutate(signUpData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockSignUp).toHaveBeenCalledWith(signUpData);
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/auth/verify-email" });
    });

    it("should handle sign up error", async () => {
      const mockSignUp = vi
        .fn()
        .mockRejectedValue(new Error("Email already exists"));
      vi.mocked(useAuthStore).getState.mockReturnValue({
        signUp: mockSignUp,
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useSignUp(), { wrapper });

      const signUpData = {
        username: "testuser",
        email: "existing@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      result.current.mutate(signUpData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockSignUp).toHaveBeenCalledWith(signUpData);
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe("useForgetPassword", () => {
    it("should send forget password email successfully", async () => {
      const { authService } = await import("../../services/autsService");
      vi.mocked(authService.forgetPassword).mockResolvedValue({
        success: true,
        message: "Reset email sent",
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useForgetPassword(), { wrapper });

      const forgetPasswordData = {
        email: "test@example.com",
      };

      result.current.mutate(forgetPasswordData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(authService.forgetPassword).toHaveBeenCalledWith(
        forgetPasswordData,
      );
    });

    it("should handle forget password error", async () => {
      const { authService } = await import("../../services/autsService");
      vi.mocked(authService.forgetPassword).mockRejectedValue(
        new Error("Email not found"),
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useForgetPassword(), { wrapper });

      const forgetPasswordData = {
        email: "nonexistent@example.com",
      };

      result.current.mutate(forgetPasswordData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(authService.forgetPassword).toHaveBeenCalledWith(
        forgetPasswordData,
      );
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe("useResetPassword", () => {
    it("should reset password successfully", async () => {
      const { authService } = await import("../../services/autsService");
      vi.mocked(authService.resetPassword).mockResolvedValue({
        success: true,
        message: "Password reset successful",
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useResetPassword(), { wrapper });

      const resetData = {
        token: "reset-token-123",
        data: {
          password: "NewPassword123!",
          confirmPassword: "NewPassword123!",
        },
      };

      result.current.mutate(resetData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(authService.resetPassword).toHaveBeenCalledWith(
        resetData.token,
        resetData.data,
      );
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/auth/signin" });
    });

    it("should handle reset password error", async () => {
      const { authService } = await import("../../services/autsService");
      vi.mocked(authService.resetPassword).mockRejectedValue(
        new Error("Invalid token"),
      );

      const wrapper = createWrapper();
      const { result } = renderHook(() => useResetPassword(), { wrapper });

      const resetData = {
        token: "invalid-token",
        data: {
          password: "NewPassword123!",
          confirmPassword: "NewPassword123!",
        },
      };

      result.current.mutate(resetData);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(authService.resetPassword).toHaveBeenCalledWith(
        resetData.token,
        resetData.data,
      );
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe("useAuth", () => {
    it("should return auth state and methods", () => {
      const mockAuthState = {
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          token: "mock-token",
          isEmailVerified: true,
        },
        isAuthenticated: true,
        signIn: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
      };

      vi.mocked(useAuthStore).mockReturnValue(mockAuthState);

      const { useAuth } = require("../../hooks/useAuth");
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toEqual(mockAuthState.user);
      expect(result.current.isAuthenticated).toBe(true);
      expect(typeof result.current.signIn).toBe("function");
      expect(typeof result.current.signUp).toBe("function");
      expect(typeof result.current.signOut).toBe("function");
    });
  });
});
