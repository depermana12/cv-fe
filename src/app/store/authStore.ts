import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AuthState,
  SignIn,
  SignUp,
  UserMinimal,
} from "@features/auth/types/types";
import { authService } from "@/features/auth/services/autsService";

const getStoredToken = (): string | null => {
  return (
    localStorage.getItem("auth-token") || sessionStorage.getItem("auth-token")
  );
};

const clearAuthData = () => {
  localStorage.removeItem("auth-token");
  sessionStorage.removeItem("auth-token");
  sessionStorage.removeItem("auth-session-active");
};

type UserSafe = Omit<UserMinimal, "token">;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
      signIn: async (login: SignIn & { rememberMe?: boolean }) => {
        const res = await authService.signIn<UserMinimal>(login);
        const user = res.data;

        if (user.token) {
          if (login.rememberMe) {
            localStorage.setItem("auth-token", user.token);
          } else {
            sessionStorage.setItem("auth-token", user.token);
          }
        }

        // exclude token
        const safeUserData: UserSafe = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        set({
          user: safeUserData as UserMinimal, // Type assertion for compatibility
          isAuthenticated: true,
          rememberMe: login.rememberMe || false,
        });

        // set up session expiry
        if (!login.rememberMe) {
          sessionStorage.setItem("auth-session-active", "true");
        }
      },
      signUp: async (inputSignUp: SignUp) => {
        const res = await authService.signUp<UserMinimal>(inputSignUp);
        const user = res.data;

        if (user.token) {
          sessionStorage.setItem("auth-token", user.token);
        }

        const safeUserData: UserSafe = {
          id: user.id,
          username: user.username,
          email: user.email,
        };

        set({
          user: safeUserData as UserMinimal, // Type assertion for compatibility
          isAuthenticated: true,
          rememberMe: false,
        });
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false, rememberMe: false });
        clearAuthData();
      },
      checkAuthValidity: () => {
        const state = get();
        if (!state.isAuthenticated) return false;

        // Check if token exists
        const token = getStoredToken();
        if (!token) {
          // No token found, logout
          set({ user: null, isAuthenticated: false, rememberMe: false });
          return false;
        }

        // If remember me is true, always valid (until manual logout)
        if (state.rememberMe) return true;

        // If remember me is false, check session storage
        const sessionActive = sessionStorage.getItem("auth-session-active");
        if (!sessionActive) {
          // Session expired, logout
          set({ user: null, isAuthenticated: false, rememberMe: false });
          clearAuthData();
          return false;
        }

        return true;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              username: state.user.username,
              email: state.user.email,
            }
          : null,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    },
  ),
);
