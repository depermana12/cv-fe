import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, SignIn, SignUp, User } from "../types/types";
import { AuthApi } from "../services/authApi";

const authApi = new AuthApi();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      rememberMe: false,
      signIn: async (inputSignIn: SignIn & { rememberMe?: boolean }) => {
        try {
          const res = await authApi.signIn<User>(inputSignIn);
          const user = res.data.data;
          console.log(user);
          set({
            user,
            isAuthenticated: true,
            rememberMe: inputSignIn.rememberMe || false,
          });

          // If remember me is false, set up session expiry
          if (!inputSignIn.rememberMe) {
            // Set a flag to check session validity
            sessionStorage.setItem("auth-session-active", "true");
          }

          return user;
        } catch (error) {
          console.error("sign in failed:", error);
          throw error;
        }
      },
      signUp: async (inputSignUp: SignUp) => {
        try {
          const res = await authApi.signUp<User>(inputSignUp);
          const user = res.data.data;
          set({ user, isAuthenticated: true, rememberMe: false });
          return user;
        } catch (error) {
          console.error("sign up failed:", error);
          throw error;
        }
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false, rememberMe: false });
        localStorage.removeItem("auth-storage");
        sessionStorage.removeItem("auth-session-active");
      },
      checkAuthValidity: () => {
        const state = get();
        if (!state.isAuthenticated) return false;

        // If remember me is true, always valid (until manual logout)
        if (state.rememberMe) return true;

        // If remember me is false, check session storage
        const sessionActive = sessionStorage.getItem("auth-session-active");
        if (!sessionActive) {
          // Session expired, logout
          set({ user: null, isAuthenticated: false, rememberMe: false });
          localStorage.removeItem("auth-storage");
          return false;
        }

        return true;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    },
  ),
);
