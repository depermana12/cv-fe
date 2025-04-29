/// <reference types="vite/client" />
declare module "@lib/*";
declare module "@components/*";
declare module "@features/*";
declare module "@routes/*";
declare module "@assets/*";
declare module "@lib/axiosClient" {
  import { AxiosClient } from "axios";
  export const axiosClient: AxiosInstance;
}
