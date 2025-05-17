import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile, IconMoonStars, IconSun } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Box>
      <Box
        component="header"
        h="60px"
        px="md"
        bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))"
        style={{
          borderBottom:
            "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
        }}
      >
        <Group justify="space-between" h="100%">
          <IconFile size={30} />

          <Group visibleFrom="sm">
            <Button variant="default" component={Link} to="/auth/signin">
              Sign In
            </Button>
            <Button component={Link} to="/auth/signup">
              Sign Up
            </Button>
            <ActionIcon
              variant="outline"
              color={computedColorScheme === "dark" ? "yellow" : "blue"}
              onClick={toggleColorScheme}
              title="Toggle color scheme"
            >
              {computedColorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoonStars size={18} />
              )}
            </ActionIcon>
          </Group>

          <Burger opened={opened} onClick={open} hiddenFrom="sm" />
        </Group>
      </Box>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
      >
        <Divider my="sm" />

        <Group grow>
          <Button
            variant="default"
            component={Link}
            to="/auth/signin"
            onClick={close}
            fullWidth
          >
            Sign In
          </Button>
          <Button component={Link} to="/auth/signup" onClick={close} fullWidth>
            Sign Up
          </Button>
        </Group>
      </Drawer>
    </Box>
  );
};
