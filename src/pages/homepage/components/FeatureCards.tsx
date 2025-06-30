import {
  IconFileDescription,
  IconBriefcase,
  IconChartHistogram,
  IconBrain,
  IconTemplate,
  IconShield,
} from "@tabler/icons-react";
import {
  Badge,
  Card,
  Container,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
  rem,
  useMantineColorScheme,
  Stack,
  ThemeIcon,
} from "@mantine/core";

const features = [
  {
    title: "AI-Powered Writing",
    description:
      "Write your first CV with confidence. Get intelligent suggestions to showcase your strengths, even with limited experience.",
    icon: IconBrain,
  },
  {
    title: "ATS-Friendly Templates",
    description:
      "Use professional templates built to pass resume scanners and get your CV seen by real recruiters.",
    icon: IconTemplate,
  },
  {
    title: "Application Tracker",
    description:
      "Keep track of jobs you’ve applied to, interviews scheduled, and follow-ups—all in one place.",
    icon: IconBriefcase,
  },
  {
    title: "Performance Insights",
    description:
      "See how your CV is performing and get tips to improve your chances of landing interviews.",
    icon: IconChartHistogram,
  },
  {
    title: "Privacy First",
    description:
      "Your personal data stays safe. Control who sees your CV and manage access with ease.",
    icon: IconShield,
  },
  {
    title: "Export Anywhere",
    description:
      "Download your CV in PDF or Word format. Ready to send to recruiters or upload to job portals.",
    icon: IconFileDescription,
  },
];

export const FeaturesCards = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const iconColor = isDark ? theme.colors.gray[2] : theme.colors.dark[6];

  return (
    <Container size="lg" py={rem(80)}>
      <Stack gap="xl" align="center">
        <Stack gap="sm" align="center">
          <Badge size="lg">Made for Fresh Graduates</Badge>
          <Title
            order={2}
            ta="center"
            fz={{ base: 28, sm: 36 }}
            fw={700}
            c={isDark ? theme.white : theme.colors.dark[7]}
          >
            Tools to Kickstart Your Career
          </Title>
          <Text
            c="dimmed"
            ta="center"
            mt="md"
            maw={600}
            mx="auto"
            size="lg"
            lh={1.6}
          >
            Whether you're applying for your first job or internship, our smart
            CV builder and tools are designed to help you stand out.
          </Text>
        </Stack>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="xl"
          mt={rem(40)}
          w="100%"
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              shadow="sm"
              radius="lg"
              p="xl"
              withBorder
              sx={{
                backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: isDark
                    ? "0 12px 24px rgba(0, 0, 0, 0.4)"
                    : "0 12px 24px rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <Stack gap="lg">
                <ThemeIcon size={60} radius="xl" variant="default" color="gray">
                  <feature.icon size={30} stroke={1.5} color={iconColor} />
                </ThemeIcon>

                <Stack gap="sm">
                  <Title order={3} fz="xl" fw={600}>
                    {feature.title}
                  </Title>
                  <Text fz="md" c="dimmed" lh={1.6}>
                    {feature.description}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
