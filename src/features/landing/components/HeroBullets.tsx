import { IconCheck, IconArrowRight } from "@tabler/icons-react";
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
  Paper,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import image from "./image.svg";

export const HeroBullets = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const gradientProps = {
    variant: "gradient",
    gradient: { from: "violet", to: "blue", deg: 129 },
  };

  return (
    <Container size="lg" py={{ base: rem(60), md: rem(100) }}>
      <Group justify="space-between" align="flex-start" wrap="wrap" gap={50}>
        <Stack gap="xl" maw={600}>
          <Title
            fz={{ base: rem(32), sm: rem(40) }}
            lh={1.3}
            fw={700}
            c={isDark ? theme.white : theme.colors.dark[7]}
          >
            Start Your Career with a{" "}
            <Text
              component="span"
              fz={{ base: rem(32), sm: rem(40) }}
              lh={1.3}
              fw={700}
              {...gradientProps}
            >
              Professional CV
            </Text>
          </Title>

          <Text
            fz="lg"
            lh={1.6}
            c={isDark ? theme.colors.gray[3] : theme.colors.gray[7]}
          >
            No experience? No problem. Our smart CV builder helps you highlight
            your strengths, projects, and education to make a great first
            impression.
          </Text>

          <List
            spacing="md"
            size="md"
            icon={
              <ThemeIcon variant="light" size={30} radius="xl">
                <IconCheck size={18} stroke={2.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <Text fw={600} component="span" {...gradientProps}>
                Smart Suggestions:
              </Text>{" "}
              Get guidance on how to describe your projects, internships, and
              coursework.
            </List.Item>
            <List.Item>
              <Text fw={600} component="span" {...gradientProps}>
                ATS-Friendly Templates:
              </Text>{" "}
              Choose from clean layouts that work with applicant tracking
              systems.
            </List.Item>
            <List.Item>
              <Text fw={600} component="span" {...gradientProps}>
                Application Tracker:
              </Text>{" "}
              Keep track of every job you apply to with deadlines and follow-up
              notes.
            </List.Item>
          </List>

          <Group mt="xl" gap="md">
            <Button
              component={Link}
              to="/auth/signup"
              size="lg"
              radius="xl"
              rightSection={<IconArrowRight size={18} />}
            >
              Get Started for Free
            </Button>
          </Group>
        </Stack>

        <Paper
          radius="md"
          p="md"
          maw={400}
          visibleFrom="md"
          style={{
            backgroundColor: isDark
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
            border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
          }}
        >
          <Image
            src={image}
            h={360}
            alt="Creating CV illustration"
            style={{
              objectFit: "contain",
              filter: isDark ? "brightness(0.9)" : "brightness(1)",
            }}
          />
        </Paper>
      </Group>
    </Container>
  );
};
