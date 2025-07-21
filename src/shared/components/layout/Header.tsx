import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import ToggleTheme from "../ui/ToggleTheme";

export const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Box component="header">
      <Box
        h={60}
        style={{
          backgroundColor:
            colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          borderBottom: `1px solid ${
            colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        }}
      >
        <Container size="lg" h="100%">
          <Group justify="space-between" align="center" h="100%">
            <Group gap="xs">
              <IconFile size={24} />
              <Anchor
                component={Link}
                to="/"
                underline="never"
                c={colorScheme === "dark" ? theme.white : theme.colors.dark[7]}
              >
                <Title order={3} size="h4">
                  myResume
                </Title>
              </Anchor>
            </Group>

            <Group visibleFrom="sm" gap="sm">
              <Button
                variant="default"
                component={Link}
                to="/auth/signin"
                aria-label="Sign in"
              >
                Sign In
              </Button>
              <Button component={Link} to="/auth/signup" aria-label="Sign up">
                Sign Up for Free
              </Button>
              <ToggleTheme />
            </Group>
            <Burger
              opened={false}
              onClick={opened ? close : open}
              hiddenFrom="sm"
              aria-label={opened ? "Close navigation" : "Open navigation"}
            />
          </Group>
        </Container>
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        title="Navigation"
        size="100%"
        padding="md"
        hiddenFrom="sm"
        withCloseButton
        closeButtonProps={{ "aria-label": "Close drawer" }}
      >
        <Divider my="sm" />
        <Stack gap="md">
          <Button
            variant="default"
            component={Link}
            to="/auth/signin"
            onClick={close}
            fullWidth
            aria-label="Sign in"
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/auth/signup"
            onClick={close}
            fullWidth
            aria-label="Sign up"
          >
            Sign Up
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
};
