import axios from "axios";
import { useAuthStore } from "../../app/store/authStore";
import { getAuthToken } from "../utils/authHelpers";
import { authService } from "@/features/auth/services/autsService";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const updateStoredToken = (newToken: string) => {
  const { rememberMe } = useAuthStore.getState();
  if (rememberMe) {
    localStorage.setItem("auth-token", newToken);
    sessionStorage.removeItem("auth-token");
  } else {
    sessionStorage.setItem("auth-token", newToken);
    localStorage.removeItem("auth-token");
  }
};

axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      useAuthStore.getState().isAuthenticated
    ) {
      originalRequest._retry = true;
      try {
        const res = await authService.refreshToken<string>();
        const newToken = res.data;

        // Update the original request with new token
        updateStoredToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear auth state by the signout and redirect
        useAuthStore.getState().signOut();
        window.location.href = "/auth/signin";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
