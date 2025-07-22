import { useAuthStore } from "@app/store/authStore";

export const getAuthStatus = () => {
  const { isAuthenticated, checkAuthValidity } = useAuthStore.getState();

  const isValid = checkAuthValidity();
  return { isAuthenticated, isValid };
};
