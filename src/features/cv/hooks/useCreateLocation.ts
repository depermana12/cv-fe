import { useMutation } from "@tanstack/react-query";
import { LocationForm } from "../types/types";
import { locationService } from "../services/locationService";
import { notifications } from "@mantine/notifications";

export const useCreateLocation = () => {
  return useMutation({
    mutationFn: async (locationInput: LocationForm) => {
      const res = await locationService.post(locationInput);
      return res.data.data;
    },
    onSuccess: (data) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Location info saved",
        message: `Your location information for ${data.city} has been saved successfully.`,
        color: "green",
      });
    },
    onError: (err) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Failed to save location info",
        message: "There was an error saving your location information.",
        color: "red",
      });
      console.error("Failed to save location info", err);
    },
  });
};
