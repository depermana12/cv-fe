import axios from "axios";
import { useAuthStore } from "../features/auth/store/authStore";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
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
      useAuthStore.getState().user
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const accessToken = refreshResponse.data.data;
        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, token: accessToken } : null,
        }));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch {
        useAuthStore.getState().signOut();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
