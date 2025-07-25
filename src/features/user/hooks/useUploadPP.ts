import { useMutation } from "@tanstack/react-query";
import { uploadService } from "../service/uploadService";
import { queryClient } from "@shared/lib/queryClient";
import { notifications } from "@mantine/notifications";

export const useUploadPP = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const { key } = await uploadService.uploadFileWithPresigned(file);
      return key;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-picture"] });

      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Upload Successful",
        message: `Profile picture uploaded successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Upload Failed",
        message: "Could not upload your profile picture.",
        color: "red",
      });
      console.error("Failed to upload profile picture", err);
    },
  });
};
