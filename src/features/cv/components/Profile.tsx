import { useNavigate } from "@tanstack/react-router";
import {
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  Box,
  Group,
  Skeleton,
  Text,
  Tooltip,
} from "@mantine/core";
import { useProfile } from "../hooks/useProfile";
import {
  IconAt,
  IconPencil,
  IconPhoneCall,
  IconWorld,
} from "@tabler/icons-react";
import { useAuthStore } from "../../auth/store/authStore";

export const Profile = () => {
  const { user } = useAuthStore();
  const id = user?.id;

  if (!id) throw new Error("User must be logged in to use Profile component");

  const { data, isPending, isError, error } = useProfile(Number(id));
  const navigate = useNavigate();

  if (isPending && !data) {
    return (
      <Box p="md" ta="center">
        <Skeleton height={120} circle mb="md" />
        <Skeleton height={20} width="60%" mx="auto" />
        <Skeleton height={16} width="80%" mt="sm" mx="auto" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert color="red" title="error loading profile" mt="md">
        {error?.message || "An unknown error occurred"}
      </Alert>
    );
  }

  const handleEdit = () => {
    navigate({
      to: "/dashboard/cv/$id/edit",
      params: { id: String(data.id) },
    });
  };

  return (
    <Box p="md" flex="flex" ta="center">
      <Box className="relative mx-auto w-fit">
        <Avatar
          src={data.image}
          size={120}
          radius={120}
          mx="auto"
          alt={`Profile picture of ${data.fullName}`}
        />
        <Tooltip label="Edit profile">
          <ActionIcon
            onClick={handleEdit}
            variant="filled"
            color="blue"
            radius="xl"
            size="sm"
            className="absolute bottom-10 right-10 border-2 border-white"
            aria-label="Edit profile"
          >
            <IconPencil size={14} />
          </ActionIcon>
        </Tooltip>
      </Box>
      <Text ta="center" fz="lg" fw={500} mt="md">
        {data.fullName}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {data.bio}
      </Text>
      <Group wrap="nowrap" gap={10} mt={3}>
        <IconAt stroke={1.5} size={16} />
        <Text fz="xs" c="dimmed">
          {data.email}
        </Text>
      </Group>

      <Group wrap="nowrap" gap={10} mt={5}>
        <IconPhoneCall stroke={1.5} size={16} />
        <Text fz="xs" c="dimmed">
          {data.phone}
        </Text>
      </Group>

      <Group wrap="nowrap" gap={10} mt={5}>
        <IconWorld stroke={1.5} size={16} />
        <Text fz="xs" c="dimmed">
          <Anchor href={data.url} target="_blank">
            {data.url}
          </Anchor>
        </Text>
      </Group>
    </Box>
  );
};
