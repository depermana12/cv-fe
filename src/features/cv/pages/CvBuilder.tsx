import { Divider, Stack, Title, Text } from "@mantine/core";
import PersonalForm from "../components/PersonalForm";

export const CvBuilder = () => {
  return (
    <Stack className="max-w-3xl w-full mx-auto">
      <Title order={2}>Create Your CV</Title>

      <Divider my="md" label="Personal Information" />
      <PersonalForm />
      <Divider my="md" label="Education" />
      <Text size="xl">collapse accordion coming soon</Text>
      <Divider my="md" label="Projects" />
      <Text size="xl">collapse accordion coming soon</Text>
    </Stack>
  );
};
