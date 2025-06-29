import { useAuthStore } from "../store/authStore";

export const useAuthStatus = () => {
  const { isAuthenticated, checkAuthValidity } = useAuthStore();

  const isValid = checkAuthValidity();
  return { isAuthenticated, isValid };
};
