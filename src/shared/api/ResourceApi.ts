import { ApiResponse } from "../types/type";
import { axiosClient } from "../lib/axiosClient";

export interface IResourceApi<T, I> {
  post(data: I): Promise<ApiResponse<T>>;
  get(id: number): Promise<ApiResponse<T>>;
  getAll(): Promise<ApiResponse<T[]>>;
  patch(id: number, data: Partial<I>): Promise<ApiResponse<T>>;
  delete(id: number): Promise<ApiResponse<void>>;
}

export class ResourceApi<T, I> implements IResourceApi<T, I> {
  protected resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  async post(data: I) {
    const res = await axiosClient.post<ApiResponse<T>>(this.resource, data);
    return res.data;
  }

  async get(id: number) {
    const res = await axiosClient.get<ApiResponse<T>>(`${this.resource}/${id}`);
    return res.data;
  }

  async getAll() {
    const res = await axiosClient.get<ApiResponse<T[]>>(this.resource);
    return res.data;
  }

  async patch(id: number, data: Partial<I>) {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/${id}`,
      data,
    );
    return res.data;
  }

  async delete(id: number) {
    const res = await axiosClient.delete<ApiResponse<void>>(
      `${this.resource}/${id}`,
    );
    return res.data;
  }
}
