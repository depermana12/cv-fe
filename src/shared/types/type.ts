export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};
export type PaginatedApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
};
