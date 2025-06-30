import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const CTA = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const background = isDark
    ? `linear-gradient(45deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[6]} 100%)`
    : `linear-gradient(45deg, ${theme.colors.blue[5]} 0%, ${theme.colors.violet[6]} 100%)`;

  const textColor = isDark ? theme.white : theme.white;
  const subTextColor = isDark ? theme.colors.gray[3] : theme.colors.gray[1];
  const smallTextColor = isDark ? theme.colors.gray[4] : theme.colors.gray[2];

  return (
    <Container size="lg" py={80}>
      <Paper radius="xl" p={60} style={{ background }}>
        <Stack align="center" gap="xl">
          <Stack align="center" gap="md">
            <Title
              order={2}
              ta="center"
              fz={{ base: 28, sm: 36 }}
              fw={700}
              c={textColor}
              maw={600}
            >
              Ready to Land Your Next Job?
            </Title>
            <Text ta="center" size="lg" c={subTextColor} maw={500} fw={500}>
              Whether you're a fresh graduate or early in your career, build a
              CV that gets noticed by recruiters and lands interviews.
            </Text>
          </Stack>

          <Button
            component={Link}
            to="/auth/signup"
            size="lg"
            radius="xl"
            variant={isDark ? "light" : "white"}
            color={isDark ? "blue" : "dark"}
            rightSection={<IconArrowRight size={18} />}
            sx={{
              boxShadow: isDark
                ? "0 8px 32px rgba(59, 130, 246, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isDark
                  ? "0 12px 40px rgba(59, 130, 246, 0.4)"
                  : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            Create Your CV Now
          </Button>

          <Group gap="xs" mt="sm">
            {[
              "No experience? No problem",
              "•",
              "Build with confidence",
              "•",
              "Fresh graduate friendly",
            ].map((text, i) => (
              <Text key={i} size="sm" c={smallTextColor}>
                {text}
              </Text>
            ))}
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};
