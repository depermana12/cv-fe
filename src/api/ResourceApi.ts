import { ApiResponse } from "../features/types/types";
import { axiosClient } from "../lib/axiosClient";

import { AxiosResponse } from "axios";

export class ResourceApi<T, I> {
  protected resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  async post(data: I): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.post<ApiResponse<T>>(this.resource, data);
  }

  async get(id: number): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.get<ApiResponse<T>>(`${this.resource}/${id}`);
  }

  async getAll(): Promise<AxiosResponse<ApiResponse<T[]>>> {
    return axiosClient.get<ApiResponse<T[]>>(this.resource);
  }

  async patch(
    id: number,
    data: Partial<I>,
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.patch<ApiResponse<T>>(`${this.resource}/${id}`, data);
  }

  async delete(id: number): Promise<AxiosResponse<ApiResponse<void>>> {
    return axiosClient.delete<ApiResponse<void>>(`${this.resource}/${id}`);
  }
}
