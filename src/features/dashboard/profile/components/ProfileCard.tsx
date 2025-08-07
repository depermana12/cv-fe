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
  Badge,
  Title,
  ActionIcon,
  Tooltip,
  Card,
} from "@mantine/core";
import { IconCamera, IconUpload, IconPencil } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateProfile } from "@features/user/hooks/useUpdateProfile";
import { useUploadPP } from "@features/user/hooks/useUploadPP";
import { ProfilePictureProps } from "../types/profile.type";

export const ProfileCard = ({
  user,
  userStats,
  onEditProfile,
}: ProfilePictureProps) => {
  const { mutate: updateProfile } = useUpdateProfile();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { mutate: uploadPP, isPending: isUpdating } = useUploadPP();

  const [
    avatarModalOpened,
    { open: openAvatarModal, close: closeAvatarModal },
  ] = useDisclosure(false);

  const avatarInitials = (() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.username ? user.username[0].toUpperCase() : "U";
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

  const getSubscriptionBadgeColor = (type: string) => {
    switch (type) {
      case "pro":
        return "yellow";
      case "free":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Card withBorder radius="md" p="lg">
        <Group justify="space-between" mb="md">
          <Badge
            variant="filled"
            color={getSubscriptionBadgeColor(user.subscriptionType || "free")}
            size="md"
            radius="sm"
          >
            {(user.subscriptionType || "free").toUpperCase()}
          </Badge>
          {onEditProfile && (
            <Tooltip label="Edit Profile">
              <ActionIcon
                size="md"
                color="gray.6"
                variant="subtle"
                onClick={onEditProfile}
                aria-label="Edit profile"
              >
                <IconPencil size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>

        <Stack align="center">
          {/* Rectangle Avatar */}
          <Box pos="relative">
            <Avatar
              src={previewUrl || profileImageUrl}
              size={120}
              radius="md"
              variant="filled"
              style={{ aspectRatio: "3/4" }}
            >
              {avatarInitials}
            </Avatar>
            <Tooltip label="Edit Avatar">
              <ActionIcon
                size="md"
                color="gray.6"
                variant="subtle"
                onClick={openAvatarModal}
                pos="absolute"
                bottom={0}
                right={0}
                aria-label="Edit avatar"
              >
                <IconCamera size={16} />
              </ActionIcon>
            </Tooltip>
          </Box>

          <Stack gap={0} align="center">
            <Title order={2}>
              {user.firstName} {user.lastName}
            </Title>

            <Text size="sm">{user.bio || "No bio provided"}</Text>
          </Stack>

          {/* Stats Row */}
          {userStats && (
            <Group gap="xl" justify="center">
              <Stack gap={0} align="center">
                <Text size="xl">{userStats.cvCreated || 0}</Text>
                <Text size="xs" c="dimmed">
                  CVs
                </Text>
              </Stack>
              <Stack gap={0} align="center">
                <Text size="xl">{userStats.totalJobApplications || 0}</Text>
                <Text size="xs" c="dimmed">
                  Applications
                </Text>
              </Stack>
              <Stack gap={0} align="center">
                <Text size="xl">{userStats.accountAge || 0}</Text>
                <Text size="xs" c="dimmed">
                  Days
                </Text>
              </Stack>
            </Group>
          )}
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
