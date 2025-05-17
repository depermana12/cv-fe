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

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      p="xl"
      style={{
        border: `1px solid ${colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
      }}
    >
      <feature.icon size={50} stroke={1.5} color={theme.colors.blue[6]} />
      <Text
        fz="lg"
        fw={500}
        mt="md"
        style={{
          "&::after": {
            content: '""',
            display: "block",
            backgroundColor: theme.colors.blue[6],
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
          },
        }}
      >
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          CV Success Toolkit
        </Badge>
      </Group>

      <Title order={2} ta="center" mt="sm" fz={{ base: 24, sm: 34 }} fw={500}>
        Everything You Need for Your Job Search
      </Title>

      <Text
        c="dimmed"
        ta="center"
        mt="md"
        maw={600}
        mx="auto"
        style={{
          "&::after": {
            content: '""',
            display: "block",
            backgroundColor: theme.colors.blue[6],
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        Our platform combines powerful CV tools with job tracking to give you an
        edge in today's competitive market.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};
