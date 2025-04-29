import { axiosClient } from "../../../lib/axiosClient";
import type { ApiResponse } from "../types/types";
import { AxiosResponse } from "axios";

export class CvApi<T, I> {
  private endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async post(data: I): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.post<ApiResponse<T>>(this.endpoint, data);
  }
  async get(id: number): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.get<ApiResponse<T>>(`${this.endpoint}/${id}`);
  }

  async patch(
    id: number,
    data: Partial<I>,
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.patch<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: number): Promise<AxiosResponse<ApiResponse<void>>> {
    return axiosClient.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }
}
