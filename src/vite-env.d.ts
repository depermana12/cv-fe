/// <reference types="vite/client" />
declare module "@lib/*";
declare module "@components/*";
declare module "@features/*";
declare module "@routes/*";
declare module "@assets/*";
declare module "@lib/axios" {
  import { AxiosInstance } from "axios";
  export const axiosInstance: AxiosInstance;
}
