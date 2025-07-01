import { useMemo } from "react";
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Modal,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout2, IconUserCircle, IconSettings } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";

import { useAuthStore } from "../../auth/store/authStore";

import { useUser } from "../../user/hooks/useUser";

const DashboardHeaderNav = () => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { signOut } = useAuthStore();

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
                  src={user.profileImage}
                  alt={user.username || "User avatar"}
                  radius="xl"
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
          >
            <Anchor component={Link} to="/dashboard/profile" underline="never">
              Profile
            </Anchor>
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSettings size={14} />}
            aria-label="Account Settings"
          >
            <Anchor component={Link} to="/dashboard/account" underline="never">
              Account Settings
            </Anchor>
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
