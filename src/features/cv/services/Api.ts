import { axiosClient } from "../../../lib/axiosClient";
import type { ApiResponse } from "../types/types";
import { AxiosResponse } from "axios";

//TODO: Error handling
/**
 * Generic API class for cv
 * @template T Response data type
 * @template I Input data type for creation/updates
 */
export class CvApi<T, I> {
  protected endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Create a new resource
   * @param data Data to create the resource
   * @returns Promise with the created resource
   */
  async post(data: I): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.post<ApiResponse<T>>(this.endpoint, data);
  }
  /**
   * Get a resource by ID
   * @param id Resource ID
   * @returns Promise with the resource
   */
  async get(id: number): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.get<ApiResponse<T>>(`${this.endpoint}/${id}`);
  }
  /**
   * Update a resource
   * @param id Resource ID
   * @param data Data to update
   * @returns Promise with the updated resource
   */
  async patch(
    id: number,
    data: Partial<I>,
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return axiosClient.patch<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
  }
  /**
   * Delete a resource
   * @param id Resource ID
   * @returns Promise with void response
   */
  async delete(id: number): Promise<AxiosResponse<ApiResponse<void>>> {
    return axiosClient.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }
}
