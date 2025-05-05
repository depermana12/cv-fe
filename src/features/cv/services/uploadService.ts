import { axiosClient } from "../../../lib/axiosClient";
import type { ApiResponse } from "../types/types";
import { AxiosResponse } from "axios";
import axios from "axios";

type PreSignedUrl = {
  url: string;
  key: string;
};

type ImageUrl = Omit<PreSignedUrl, "key">;
type ImagesUrl = PreSignedUrl & { size: number; lastModified: string };
const axiosInstance = axios.create();

export const requestSignedUrl = async (
  contentType: string,
): Promise<AxiosResponse<ApiResponse<PreSignedUrl>>> => {
  return axiosClient.post<ApiResponse<PreSignedUrl>>(
    "cv/uploads/presigned",
    {
      fileType: contentType,
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
): Promise<AxiosResponse<ApiResponse<PreSignedUrl>>> => {
  return axiosClient.post<ApiResponse<PreSignedUrl>>(
    "cv/uploads/direct-server",
    file,
  );
};

export const getImages = async (): Promise<
  AxiosResponse<ApiResponse<ImagesUrl[]>>
> => {
  return axiosClient.get<ApiResponse<ImagesUrl[]>>("cv/uploads/images");
};

export const getImage = async (
  key: string,
): Promise<AxiosResponse<ApiResponse<ImageUrl>>> => {
  return axiosClient.get<ApiResponse<ImageUrl>>(`cv/uploads/images/${key}`);
};

export const deleteImage = async (
  key: string,
): Promise<AxiosResponse<ApiResponse<void>>> => {
  return axiosClient.delete<ApiResponse<void>>(`cv/uploads/images/${key}`);
};

/**
 * Upload file to a given URL using PUT method
 * @param url - The URL to upload the file to  
 * @param file - The file to upload
 * 

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
