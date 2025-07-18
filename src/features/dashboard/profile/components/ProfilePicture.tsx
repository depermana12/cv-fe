import { useState } from "react";
import {
  Stack,
  Title,
  Card,
  Avatar,
  Button,
  Modal,
  FileInput,
  Group,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateProfile } from "../../../user/hooks/useUpdateProfile";
import { useUploadPP } from "../../../user/hooks/useUploadPP";
import { ProfilePictureProps } from "../types/profile.type";

export const ProfilePicture = ({ user }: ProfilePictureProps) => {
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
    updateProfile({ profileImage: null });
  };

  return (
    <>
      <Card padding="lg" radius="md">
        <Stack align="center" gap="md">
          <Title order={4}>Profile Picture</Title>

          <Box pos="relative">
            <Avatar
              src={previewUrl || profileImageUrl}
              size={200}
              radius={200}
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
        </Stack>
      </Card>

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
