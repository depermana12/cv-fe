import {
  IconFileDescription,
  IconBriefcase,
  IconChartHistogram,
} from "@tabler/icons-react";
import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
  rem,
  useMantineColorScheme,
  Stack,
} from "@mantine/core";

const mockdata = [
  {
    title: "Professional Templates",
    description:
      "Choose from dozens of ATS-friendly templates designed to get your CV noticed by recruiters and hiring managers.",
    icon: IconFileDescription,
  },
  {
    title: "Job Application Tracker",
    description:
      "Keep track of all your job applications in one place with status updates, follow-up reminders, and company details.",
    icon: IconBriefcase,
  },
  {
    title: "Performance Analytics",
    description:
      "Get insights on which CV versions perform best and optimize your applications for better response rates.",
    icon: IconChartHistogram,
  },
];

export const FeaturesCards = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      p="xl"
      style={{
        border: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
        backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
      }}
    >
      <Stack gap="sm">
        <feature.icon
          size={50}
          stroke={1.5}
          color={isDark ? theme.colors.blue[4] : theme.colors.blue[6]}
        />
        <Text fz="lg" fw={600}>
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed">
          {feature.description}
        </Text>
      </Stack>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg" color="blue">
          CV Success Toolkit
        </Badge>
      </Group>

      <Title
        order={2}
        ta="center"
        mt="sm"
        fz={{ base: 24, sm: 34 }}
        fw={600}
        c={isDark ? theme.white : theme.black}
      >
        Everything You Need for Your Job Search
      </Title>

      <Text
        c="dimmed"
        ta="center"
        mt="md"
        maw={600}
        mx="auto"
        style={{
          position: "relative",
          paddingBottom: rem(16),
        }}
      >
        Our platform combines powerful CV tools with job tracking to give you an
        edge in today's competitive market.
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="xl"
        mt={50}
        verticalSpacing="xl"
      >
        {features}
      </SimpleGrid>
    </Container>
  );
};
