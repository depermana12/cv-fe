import axios from "axios";
import { useAuthStore } from "../features/auth/store/authStore";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
