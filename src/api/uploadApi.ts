import type { ApiResponse } from "../features/types/types";
import { AxiosResponse } from "axios";
import { axiosClient } from "../lib/axiosClient";
import { bucketAxiosClient } from "../lib/bucketAxiosClient";

type ImageMeta = {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
  etag?: string;
  storageClass?: string;
};

type ImageListResponse = {
  images: ImageMeta[];
};

type PreSignedUploadRes = {
  url: string;
  key: string;
};

export class UploadApi {
  private readonly resource = "/uploads";

  // -------------------------
  // Presigned Upload (PUT)
  // -------------------------

  async presignedUrl(contentType: string): Promise<PreSignedUploadRes> {
    const res = await axiosClient.post<{ data: PreSignedUploadRes }>(
      `${this.resource}/presigned`,
      {
        fileType: contentType, // refactor the backend, fix this confusing
      },
    );
    return res.data.data;
  }

  async uploadPresignedUrl(presignedUrl: string, file: File): Promise<void> {
    await bucketAxiosClient.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  }

  async uploadFileWithPresigned(file: File): Promise<{ key: string }> {
    try {
      const { url, key } = await this.presignedUrl(file.type);
      await this.uploadPresignedUrl(url, file);
      return { key };
    } catch (error: unknown) {
      console.error("Presigned upload failed:", error);
      throw error;
    }
  }

  // -------------------------
  // Read/list/delete
  // -------------------------

  async listImages(prefix?: string): Promise<ImageListResponse> {
    const { data: res } = await axiosClient.get<
      ApiResponse<ImageListResponse["images"]>
    >(`${this.resource}/images`, { params: { prefix } });
    return { images: res.data };
  }

  async deleteImage(key: string): Promise<void> {
    await axiosClient.delete(`${this.resource}/images/${key}`);
  }

  async getImagePresignedUrl(key: string): Promise<string> {
    const normalizedKey = key.startsWith("uploads/")
      ? key.slice("uploads/".length)
      : key;
    const { data: res } = await axiosClient.get<ApiResponse<{ url: string }>>(
      `${this.resource}/images/${normalizedKey}`,
    );
    return res.data.url;
  }

  // -------------------------------
  // Direct upload handle by backend
  // -------------------------------

  async uploadDirectToServer(file: File): Promise<
    AxiosResponse<
      ApiResponse<
        PreSignedUploadRes & {
          filename: string;
          fileSize: number;
          fileType: string;
        }
      >
    >
  > {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post<
      ApiResponse<
        PreSignedUploadRes & {
          filename: string;
          fileSize: number;
          fileType: string;
        }
      >
    >(`${this.resource}/direct-server`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
}
