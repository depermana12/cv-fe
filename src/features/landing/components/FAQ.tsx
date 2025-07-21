import {
  Accordion,
  Container,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  rem,
  Badge,
} from "@mantine/core";

const faqData = [
  {
    question: "How does the AI-powered CV builder help fresh graduates?",
    answer:
      "Our AI guides you step-by-step, suggesting wording and skills that align with your target roles—even if you have limited experience.",
  },
  {
    question: "Are the templates optimized for Applicant Tracking Systems?",
    answer:
      "Yes. All templates follow ATS best practices to ensure proper formatting, clean structure, and readable fonts that pass automated scanners.",
  },
  {
    question: "Can I manage multiple job applications?",
    answer:
      "Absolutely. You can track each job application, add notes, mark statuses, and attach custom CV versions tailored for each role.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. Your data is encrypted and never shared. You have full control to export or permanently delete your account at any time.",
  },
  {
    question: "Can I build different CV versions for different jobs?",
    answer:
      "Yes. You can create and manage multiple CVs, each personalized for different job types or industries.",
  },
];

export const FAQ = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Container size="md" py={rem(80)}>
      <Stack gap="xl" align="center">
        <Stack gap="sm" align="center">
          <Badge size="lg">FAQ</Badge>
          <Title
            order={2}
            ta="center"
            fz={{ base: 24, sm: 32 }}
            fw={600}
            c={isDark ? theme.white : theme.colors.dark[7]}
          >
            Common Questions About Your CV Journey
          </Title>
          <Text ta="center" c="dimmed" maw={520} size="md">
            Learn how our tools help you build a strong first impression and
            land your first job.
          </Text>
        </Stack>

        <Accordion
          variant="separated"
          radius="md"
          w="100%"
          styles={{
            item: {
              backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
              border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
              transition: "all 0.2s ease",
            },
            control: {
              padding: theme.spacing.md,
              "&:hover": {
                backgroundColor: isDark
                  ? theme.colors.dark[5]
                  : theme.colors.gray[0],
              },
            },
            content: {
              padding: `0 ${theme.spacing.md} ${theme.spacing.md}`,
            },
            label: {
              fontSize: theme.fontSizes.md,
              fontWeight: 600,
              color: isDark ? theme.white : theme.colors.dark[6],
            },
          }}
        >
          {faqData.map((faq, index) => (
            <Accordion.Item key={index} value={`faq-${index}`}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>
                <Text c="dimmed" size="sm" lh={1.6}>
                  {faq.answer}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
};
