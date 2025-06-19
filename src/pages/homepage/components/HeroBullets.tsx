import { IconCheck } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import image from "./image.svg";

export const HeroBullets = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Container size="lg" py={{ base: rem(40), md: rem(80) }}>
      <Group justify="space-between" align="flex-start" wrap="wrap" gap={50}>
        <Stack gap="md" style={{ maxWidth: rem(480) }}>
          <Title
            c={isDark ? theme.white : theme.colors.dark[7]}
            fz={{ base: rem(28), xs: rem(38), md: rem(44) }}
            lh={1.2}
            fw={600}
          >
            Build Your <br />
            <Text
              span
              px="sm"
              py={4}
              fw={600}
              bg={isDark ? theme.colors.blue[7] : theme.colors.blue[2]}
              style={{ borderRadius: rem(4) }}
              inherit
            >
              Professional
            </Text>{" "}
            CV Effortlessly
          </Title>

          <Text c="dimmed" mt="md" fz="md">
            Create, customize, and manage multiple CV versions tailored for
            different job applications. Track your submissions and get hired
            faster with our powerful tools.
          </Text>

          <List
            size="sm"
            spacing="sm"
            mt="md"
            icon={
              <ThemeIcon
                size={20}
                radius="xl"
                variant="light"
                color={isDark ? "blue.4" : "blue"}
              >
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>AI-Powered Suggestions</b> - Get tailored content
              recommendations based on your target roles
            </List.Item>
            <List.Item>
              <b>Multi-Version Management</b> - Maintain different CV versions
              for various job applications
            </List.Item>
            <List.Item>
              <b>Application Tracker</b> - Monitor where you've applied and
              follow up effectively
            </List.Item>
          </List>

          <Group mt="lg">
            <Button radius="md" size="md">
              Create Your CV
            </Button>
            <Button variant="default" radius="md" size="md">
              Track Applications
            </Button>
          </Group>
        </Stack>

        <Image
          src={image}
          w={{ base: "100%", md: 376 }}
          h={{ base: "auto", md: 356 }}
          visibleFrom="md"
          alt="Professional CV illustration"
          style={{ objectFit: "contain" }}
        />
      </Group>
    </Container>
  );
};
