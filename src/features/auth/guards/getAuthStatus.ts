import { useAuthStore } from "@app/store/authStore";

export const getAuthStatus = () => {
  const { isAuthenticated, checkAuthValidity, user } = useAuthStore.getState();

  const isValid = checkAuthValidity();
  return { isAuthenticated, isValid, user };
};
