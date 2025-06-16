import { axiosClient } from "../../../lib/axiosClient";
import type { ApiResponse } from "../types/types";
import { AxiosResponse } from "axios";

export class SubResourceApi<T, I> {
  protected resource: string;
  protected subResource: string;

  constructor(resource = "cvs", subResource: string) {
    this.resource = resource;
    this.subResource = subResource;
  }
  async post(cvId: number, data: I): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.post<ApiResponse<T>>(
      `${this.resource}/${cvId}/${this.subResource}`,
      data,
    );
  }
  async get(cvId: number, id: number): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.get<ApiResponse<T>>(
      `${this.resource}/${cvId}/${this.subResource}/${id}`,
    );
  }
  async getAll(cvId: number): Promise<AxiosResponse<ApiResponse<T[]>>> {
    return axiosClient.get<ApiResponse<T[]>>(
      `${this.resource}/${cvId}/${this.subResource}`,
    );
  }
  async patch(
    cvId: number,
    id: number,
    data: Partial<I>,
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/${cvId}/${this.subResource}/${id}`,
      data,
    );
  }
  async delete(
    cvId: number,
    id: number,
  ): Promise<AxiosResponse<ApiResponse<void>>> {
    return axiosClient.delete<ApiResponse<void>>(
      `${this.resource}/${cvId}/${this.subResource}/${id}`,
    );
  }
}
