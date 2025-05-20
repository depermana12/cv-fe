import { Avatar, Box, Group, Menu, Text } from "@mantine/core";
import { usePersonalId } from "../../features/cv/hooks/usePersonalId";
import { useProfile } from "../../features/cv/hooks/useProfile";
import { IconLogout2, IconUserCircle } from "@tabler/icons-react";
import ToggleTheme from "./ToggleTheme";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useNavigate } from "@tanstack/react-router";

const DashboardHeaderNav = () => {
  const personalId = usePersonalId();
  const { data: user } = useProfile(personalId);
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Group justify="flex-end" gap="sm">
      <Menu withArrow position="bottom-end">
        <Menu.Target>
          <Box
            style={{
              cursor: "pointer",
            }}
          >
            {user.image ? (
              <Avatar
                src={user.image}
                alt={user.fullName || "User avatar"}
                radius="xl"
              />
            ) : (
              <Avatar
                radius="xl"
                color="blue"
                name={user.fullName
                  .split(" ")
                  .map((initial) => initial[0])
                  .join("")}
              />
            )}
          </Box>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>
            <Text size="xs" fw={500} truncate>
              {user.fullName || "User"}
            </Text>
            <Text size="xs" c="dimmed" truncate>
              {user.email}
            </Text>
          </Menu.Label>
          <Menu.Divider />
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            {/* TODO: add component and link it */}
            Profile
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={<IconLogout2 size={14} />}
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ToggleTheme />
    </Group>
  );
};
export default DashboardHeaderNav;
