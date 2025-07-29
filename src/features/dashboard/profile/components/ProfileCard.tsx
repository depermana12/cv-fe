import { useState } from "react";
import {
  Stack,
  Text,
  Avatar,
  Button,
  Modal,
  FileInput,
  Group,
  Box,
  useMantineColorScheme,
  Paper,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateProfile } from "@features/user/hooks/useUpdateProfile";
import { useUploadPP } from "@features/user/hooks/useUploadPP";
import { ProfilePictureProps } from "../types/profile.type";

export const ProfileCard = ({ user }: ProfilePictureProps) => {
  const { mutate: updateProfile } = useUpdateProfile();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { mutate: uploadPP, isPending: isUpdating } = useUploadPP();

  const [
    avatarModalOpened,
    { open: openAvatarModal, close: closeAvatarModal },
  ] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const avatarInitials = (() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.username ? user.username[0].toUpperCase() : "n/a";
  })();

  const cdn = import.meta.env.VITE_CDN;
  const constructImageUrl = (key: string | null | undefined) => {
    return key ? `${cdn}/${key?.replace(/^uploads\//, "")}` : null;
  };
  const profileImageUrl = constructImageUrl(user.profileImage);

  const resetModal = () => {
    setFile(null);
    setPreviewUrl(null);
    closeAvatarModal();
  };

  const handleUploadPP = () => {
    if (!file) return;
    uploadPP(file, {
      onSuccess: (key) => {
        updateProfile(
          { profileImage: key },
          {
            onSuccess: resetModal,
          },
        );
      },
    });
  };

  const handleDeletePP = () => {
    updateProfile({ profileImage: undefined });
  };

  return (
    <>
      <Paper p="lg" radius="md" withBorder>
        <Stack align="center" gap="md">
          <Box pos="relative">
            <Avatar
              src={previewUrl || profileImageUrl}
              size={150}
              radius={150}
              color="blue"
              sx={(theme) => ({
                background: isDark
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2],
                border: "2px solid transparent",
              })}
            >
              {avatarInitials}
            </Avatar>
            <Button
              size="xs"
              variant="default"
              leftSection={<IconCamera size={14} />}
              onClick={openAvatarModal}
              pos="absolute"
              bottom={0}
              right={0}
            >
              Edit
            </Button>
          </Box>
          <Stack gap={0}>
            <Text ta="center" fz="lg" mt="sm">
              {user.firstName} {user.lastName}
            </Text>
            <Text ta="center" c="dimmed">
              {user.bio || "No bio available"}
            </Text>
          </Stack>
        </Stack>
      </Paper>

      <Modal
        opened={avatarModalOpened}
        onClose={resetModal}
        title="Update Profile Picture"
        centered
      >
        <Stack gap="md">
          <FileInput
            label="Profile Picture"
            description="Upload a square photo with a minimum size of 300×300px"
            placeholder="Select image file"
            clearable
            accept="image/*"
            leftSection={<IconUpload size={16} />}
            value={file}
            onChange={(file) => {
              setFile(file);
              setPreviewUrl(file ? URL.createObjectURL(file) : null);
            }}
          />
          <Group justify="flex-start">
            <Button
              variant="outline"
              onClick={handleUploadPP}
              disabled={!file || isUpdating}
              loading={isUpdating}
            >
              Upload
            </Button>
            {user.profileImage ? (
              <Button color="red" onClick={handleDeletePP}>
                Remove
              </Button>
            ) : null}
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
