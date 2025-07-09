import { useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Modal,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout2, IconUserCircle } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";

import { useAuthStore } from "../../auth/store/authStore";

import { useUser } from "../../user/hooks/useUser";

const DashboardHeaderNav = () => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { signOut } = useAuthStore();

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const handleSignOut = () => {
    signOut();
    closeModal();
    navigate({ to: "/" });
  };

  // the desicion on the db design using fullName is bad
  // i came back after refactor the backend, 16/06/2025
  const avatarInitials = useMemo(() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.username ? user.username[0].toUpperCase() : "n/a";
  }, [user.firstName, user.lastName, user.username]);

  const baseCdn = import.meta.env.VITE_CDN;
  const profileImgUrl = user.profileImage
    ? `${baseCdn}/${user.profileImage.split("/")[1]}`
    : null;

  return (
    <Group justify="flex-end" gap="sm">
      <Modal
        opened={opened}
        onClose={closeModal}
        title="Confirm sign out"
        aria-label="Sign out confirmation dialog"
        centered
      >
        <Text mb="md">Are you sure you want to sign out?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleSignOut}>
            Sign out
          </Button>
        </Group>
      </Modal>

      <Menu withArrow position="bottom-end">
        <Menu.Target>
          <Tooltip
            label="Account menu"
            position="bottom"
            withArrow
            withinPortal
          >
            <Box
              style={{
                cursor: "pointer",
              }}
            >
              {user.profileImage ? (
                <Avatar
                  src={profileImgUrl}
                  alt={user.username || "User avatar"}
                  radius="xl"
                  sx={(theme) => ({
                    background: isDark
                      ? theme.colors.dark[5]
                      : theme.colors.gray[2],
                    border: "2px solid transparent",
                    "&:hover": {
                      borderColor: isDark
                        ? theme.colors.gray[6]
                        : theme.colors.dark[2],
                    },
                  })}
                />
              ) : (
                <Avatar radius="xl" color="blue" name={avatarInitials} />
              )}
            </Box>
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label aria-label="User information">
            <Text size="xs" fw={500} truncate>
              {user.username || "User"}
            </Text>
            <Text size="xs" c="dimmed" truncate>
              {user.email}
            </Text>
          </Menu.Label>
          <Menu.Divider />{" "}
          <Menu.Item
            leftSection={<IconUserCircle size={14} />}
            aria-label="Profile"
            component={Link}
            to="/dashboard/profile"
          >
            Profile
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={<IconLogout2 size={14} />}
            aria-label="Sign out"
            onClick={openModal}
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
export default DashboardHeaderNav;
