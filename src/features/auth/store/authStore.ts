import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, SignIn, SignUp, User } from "../types/types";
import { AuthApi } from "../services/authApi";

const authApi = new AuthApi();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (inputSignIn: SignIn) => {
        try {
          const res = await authApi.signIn<User>(inputSignIn);
          const user = res.data.data;
          console.log(user);
          set({ user, isAuthenticated: true });
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
          set({ user, isAuthenticated: true });
          return user;
        } catch (error) {
          console.error("sign up failed:", error);
          throw error;
        }
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
