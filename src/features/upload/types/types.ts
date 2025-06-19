export type PreSignedUrlResponse = {
  url: string;
  key: string;
};

export type ImageUrlResponse = {
  url: string;
};

export type ImageMetadata = {
  key: string;
  lastModified: string;
  size: number;
  etag: string;
  url: string;
};

export type DirectUploadResponse = {
  key: string;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};
