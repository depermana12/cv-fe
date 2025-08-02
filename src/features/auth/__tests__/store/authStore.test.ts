import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useAuthStore } from "../../../../app/store/authStore";
import { authService } from "../../services/autsService";

// Mock the auth service
vi.mock("../../services/autsService", () => ({
  authService: {
    signIn: vi.fn(),
    signUp: vi.fn(),
  },
}));

// Mock localStorage and sessionStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

const mockedAuthService = vi.mocked(authService);

describe("AuthStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the store state
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("initial state", () => {
    it("should have correct initial state", () => {
      const { user, isAuthenticated, rememberMe } = useAuthStore.getState();

      expect(user).toBeNull();
      expect(isAuthenticated).toBe(false);
      expect(rememberMe).toBe(false);
    });
  });

  describe("signIn", () => {
    it("should sign in user and set authentication state", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        token: "mock-token-123",
        isEmailVerified: true,
      };

      const mockResponse = {
        data: mockUser,
        success: true,
        message: "Login successful",
      };

      mockedAuthService.signIn.mockResolvedValueOnce(mockResponse);

      const { signIn } = useAuthStore.getState();
      await signIn({
        email: "test@example.com",
        password: "Password123!",
        rememberMe: false,
      });

      const state = useAuthStore.getState();

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual({
        id: 1,
        username: "testuser",
        email: "test@example.com",
        isEmailVerified: true,
      });
      expect(state.rememberMe).toBe(false);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        "auth-token",
        "mock-token-123",
      );
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        "auth-session-active",
        "true",
      );
    });

    it("should sign in with remember me and use localStorage", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        token: "mock-token-123",
        isEmailVerified: true,
      };

      const mockResponse = {
        data: mockUser,
        success: true,
        message: "Login successful",
      };

      mockedAuthService.signIn.mockResolvedValueOnce(mockResponse);

      const { signIn } = useAuthStore.getState();
      await signIn({
        email: "test@example.com",
        password: "Password123!",
        rememberMe: true,
      });

      const state = useAuthStore.getState();

      expect(state.isAuthenticated).toBe(true);
      expect(state.rememberMe).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "auth-token",
        "mock-token-123",
      );
      expect(sessionStorageMock.setItem).not.toHaveBeenCalledWith(
        "auth-session-active",
        "true",
      );
    });

    it("should handle sign in error", async () => {
      const errorResponse = new Error("Invalid credentials");
      mockedAuthService.signIn.mockRejectedValueOnce(errorResponse);

      const { signIn } = useAuthStore.getState();

      await expect(
        signIn({
          email: "test@example.com",
          password: "wrongpassword",
        }),
      ).rejects.toThrow("Invalid credentials");

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe("signUp", () => {
    it("should sign up user and set authentication state", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
        token: "mock-token-123",
        isEmailVerified: false,
      };

      const mockResponse = {
        data: mockUser,
        success: true,
        message: "User created successfully",
      };

      mockedAuthService.signUp.mockResolvedValueOnce(mockResponse);

      const { signUp } = useAuthStore.getState();
      await signUp({
        username: "testuser",
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      });

      const state = useAuthStore.getState();

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual({
        id: 1,
        username: "testuser",
        email: "test@example.com",
        isEmailVerified: false,
      });
      expect(state.rememberMe).toBe(false);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        "auth-token",
        "mock-token-123",
      );
    });

    it("should handle sign up error", async () => {
      const errorResponse = new Error("Email already exists");
      mockedAuthService.signUp.mockRejectedValueOnce(errorResponse);

      const { signUp } = useAuthStore.getState();

      await expect(
        signUp({
          username: "testuser",
          email: "test@example.com",
          password: "Password123!",
          confirmPassword: "Password123!",
        }),
      ).rejects.toThrow("Email already exists");

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe("signOut", () => {
    it("should clear authentication state and storage", () => {
      // Set initial authenticated state
      useAuthStore.setState({
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          token: "mock-token",
          isEmailVerified: true,
        },
        isAuthenticated: true,
        rememberMe: true,
      });

      const { signOut } = useAuthStore.getState();
      signOut();

      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.rememberMe).toBe(false);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("auth-token");
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith("auth-token");
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(
        "auth-session-active",
      );
    });
  });

  describe("checkAuthValidity", () => {
    it("should return false if not authenticated", () => {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
        rememberMe: false,
      });

      const { checkAuthValidity } = useAuthStore.getState();
      const isValid = checkAuthValidity();

      expect(isValid).toBe(false);
    });

    it("should return false if no token exists and clear auth state", () => {
      useAuthStore.setState({
        user: {
          id: 1,
          username: "test",
          email: "test@example.com",
          token: "mock-token",
          isEmailVerified: true,
        },
        isAuthenticated: true,
        rememberMe: false,
      });

      localStorageMock.getItem.mockReturnValue(null);
      sessionStorageMock.getItem.mockReturnValue(null);

      const { checkAuthValidity } = useAuthStore.getState();
      const isValid = checkAuthValidity();

      expect(isValid).toBe(false);

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it("should return true if remember me is enabled and token exists", () => {
      useAuthStore.setState({
        user: {
          id: 1,
          username: "test",
          email: "test@example.com",
          token: "mock-token",
          isEmailVerified: true,
        },
        isAuthenticated: true,
        rememberMe: true,
      });

      localStorageMock.getItem.mockReturnValue("mock-token");

      const { checkAuthValidity } = useAuthStore.getState();
      const isValid = checkAuthValidity();

      expect(isValid).toBe(true);
    });

    it("should check session validity for non-remember me users", () => {
      useAuthStore.setState({
        user: {
          id: 1,
          username: "test",
          email: "test@example.com",
          token: "mock-token",
          isEmailVerified: true,
        },
        isAuthenticated: true,
        rememberMe: false,
      });

      sessionStorageMock.getItem
        .mockReturnValueOnce("mock-token") // auth-token
        .mockReturnValueOnce("true"); // auth-session-active

      const { checkAuthValidity } = useAuthStore.getState();
      const isValid = checkAuthValidity();

      expect(isValid).toBe(true);
    });
  });
});
