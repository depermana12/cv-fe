import { Box, Text, Stack, Title } from "@mantine/core";
import { CvThemeSelector } from "@features/dashboard/cv/components/CvThemeSelector";
import { useCvStore } from "../../../store/cvStore";

export const CVDesignEditor = () => {
  const { activeCvId } = useCvStore();
  const cvId = activeCvId!;
  return (
    <Box p="md" style={{ height: "100%", overflow: "auto" }}>
      <Stack gap="md">
        <div>
          <Title order={4}>Design Editor</Title>
          <Text c="dimmed" size="sm">
            CV ID: {cvId}
          </Text>
          <Text c="dimmed" size="sm" mt="xs">
            Customize the visual appearance of your CV with themes and styling
            options.
          </Text>
        </div>

        <CvThemeSelector />
      </Stack>
    </Box>
  );
};
