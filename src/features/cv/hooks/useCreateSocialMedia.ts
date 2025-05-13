import { useMutation } from "@tanstack/react-query";
import { SocialMediaForm } from "../types/types";
import { socialMediaService } from "../services/socialMedia";
import { notifications } from "@mantine/notifications";

export const useCreateSocialMedia = () => {
  return useMutation({
    mutationFn: async (socialMediaInput: SocialMediaForm) => {
      const res = await socialMediaService.post(socialMediaInput);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Social Media info saved",
        message: `Your social media information for ${data.social} has been saved successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save social media info",
        message: "There was an error saving your social media information.",
        color: "red",
      });
      console.error("Failed to save social media info", err);
    },
  });
};
