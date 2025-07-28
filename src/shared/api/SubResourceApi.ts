import { ApiResponse } from "../types/type";
import { axiosClient } from "../lib/axiosClient";

export interface ISubResourceApi<T, I> {
  post(parentId: number, data: I): Promise<ApiResponse<T>>;
  get(parentId: number, id: number): Promise<ApiResponse<T>>;
  getAll(parentId: number): Promise<ApiResponse<T[]>>;
  patch(
    parentId: number,
    id: number,
    data: Partial<I>,
  ): Promise<ApiResponse<T>>;
  delete(parentId: number, id: number): Promise<ApiResponse<boolean>>;
}

export class SubResourceApi<T, I> implements ISubResourceApi<T, I> {
  protected resource: string;
  protected subResource: string;

  constructor(subResource: string, resource = "/cvs") {
    this.resource = resource;
    this.subResource = subResource;
  }

  async post(cvId: number, data: I) {
    const res = await axiosClient.post<ApiResponse<T>>(
      `${this.resource}/${cvId}/${this.subResource}`,
      data,
    );
    return res.data;
  }
  async get(cvId: number, id: number) {
    const res = await axiosClient.get<ApiResponse<T>>(
      `${this.resource}/${cvId}/${this.subResource}/${id}`,
    );
    return res.data;
  }

  async getAll(cvId: number) {
    const res = await axiosClient.get<ApiResponse<T[]>>(
      `${this.resource}/${cvId}/${this.subResource}`,
    );
    return res.data;
  }

  async patch(cvId: number, id: number, data: Partial<I>) {
    const res = await axiosClient.patch<ApiResponse<T>>(
      `${this.resource}/${cvId}/${this.subResource}/${id}`,
      data,
    );
    return res.data;
  }

  async delete(cvId: number, id: number) {
    const res = await axiosClient.delete<ApiResponse<boolean>>(
      `${this.resource}/${cvId}/${this.subResource}/${id}`,
    );
    return res.data;
  }
}
