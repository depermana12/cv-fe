import { axiosClient } from "../../../lib/axiosClient";

import { AxiosResponse } from "axios";
import axios from "axios";
import type {
  ImageMetadata,
  ImageUrlResponse,
  PreSignedUrlResponse,
  ApiResponse,
  DirectUploadResponse,
} from "../types/types";

const axiosInstance = axios.create();

export const requestSignedUrl = async (
  fileType: string,
  folder?: string,
): Promise<AxiosResponse<ApiResponse<PreSignedUrlResponse>>> => {
  return axiosClient.post<ApiResponse<PreSignedUrlResponse>>(
    "/uploads/presigned",
    {
      fileType: fileType,
      folder: folder,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const directUpload = async (
  file: File,
  folder?: string,
): Promise<AxiosResponse<ApiResponse<DirectUploadResponse>>> => {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) {
    formData.append("folder", folder);
  }

  return axiosClient.post<ApiResponse<DirectUploadResponse>>(
    "/uploads/direct-server",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const getImages = async (
  prefix?: string,
): Promise<AxiosResponse<ApiResponse<ImageMetadata[]>>> => {
  const params = prefix ? { prefix } : {};
  return axiosClient.get<ApiResponse<ImageMetadata[]>>("/uploads/images", {
    params,
  });
};

export const getImage = async (
  key: string,
): Promise<AxiosResponse<ApiResponse<ImageUrlResponse>>> => {
  return axiosClient.get<ApiResponse<ImageUrlResponse>>(
    `/uploads/images/${key}`,
  );
};

export const deleteImage = async (
  key: string,
): Promise<AxiosResponse<ApiResponse<void>>> => {
  return axiosClient.delete<ApiResponse<void>>(`/uploads/images/${key}`);
};

/**
 * Upload file to a given URL using PUT method
 * @param url - The URL to upload the file to
 * @param file - The file to upload
 */

/**
 * s3 upload function
 * clean axios instance without any default headers
 * @param url - The signed URL to upload the file to
 * @param file - The file to upload
 */

export const uploadFile = async (
  url: string,
  file: File,
): Promise<AxiosResponse<void>> => {
  // pristine axios instance without any default headers
  return axiosInstance.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};
