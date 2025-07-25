import { Stack, Title, Text } from "@mantine/core";
import { PublicCvViewer } from "../components/PublicCvViewer";

export const PublicCvPage = () => {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2}>Public CV Viewer</Title>
        <Text c="dimmed">View public CVs by username and slug</Text>
      </div>

      <PublicCvViewer />
    </Stack>
  );
};
