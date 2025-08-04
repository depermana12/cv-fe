import { useState, useEffect } from "react";
import {
  Stack,
  Group,
  Tabs,
  Grid,
  Box,
  Title,
  Text,
  Button,
  Alert,
  Loader,
} from "@mantine/core";
import {
  IconPalette,
  IconFileText,
  IconPencil,
  IconList,
} from "@tabler/icons-react";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useQuery } from "@tanstack/react-query";
import { cvQuery } from "@features/dashboard/cv/hooks/query";
import { CVDesignEditor } from "@features/dashboard/cv/sections/builder/components/CVDesignEditor";
import { CVLivePreviewA4 } from "@features/dashboard/cv/components/CVLivePreviewA4";
import { CvSectionManager } from "@features/dashboard/cv/sections/builder/components/CvSectionManager";
import { CVContentEditor } from "@features/dashboard/cv/sections/builder/components/CVContentEditor";
import { useParams } from "@tanstack/react-router";

export const CvBuilderPage = () => {
  const [activeTab, setActiveTab] = useState<
    "sections" | "content" | "design" | null
  >("content");

  const { setActiveCvId } = useCvStore();
  const { loadSectionsForCv } = useCVSectionStore();

  const { cvId } = useParams({ from: "/dashboard/cv/library/$cvId" });
  const cvIdNumber = +cvId;

  const { data: cv, isLoading } = useQuery(cvQuery(cvIdNumber));

  // Set active CV and load sections when component mounts
  useEffect(() => {
    if (cvIdNumber) {
      setActiveCvId(cvIdNumber);
      loadSectionsForCv(cvIdNumber);
    }
  }, [cvIdNumber, setActiveCvId, loadSectionsForCv]);

  if (isLoading || !cvIdNumber) {
    return <Loader color="blue" type="dots" />;
  }

  if (!cv) {
    return (
      <Alert color="red">
        <Text>CV not found. Please select a CV to edit.</Text>
      </Alert>
    );
  }

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between">
        <Title order={2} size="h3">
          {cv.title}
        </Title>

        <Button leftSection={<IconFileText size={16} />}>Export</Button>
      </Group>

      {/* Tabs Header */}
      <Tabs
        value={activeTab}
        variant="outline"
        onChange={(value) =>
          setActiveTab(value as "sections" | "content" | "design" | null)
        }
      >
        <Tabs.List>
          <Tabs.Tab value="sections" leftSection={<IconList size={16} />}>
            Sections
          </Tabs.Tab>
          <Tabs.Tab value="content" leftSection={<IconPencil size={16} />}>
            Content Editor
          </Tabs.Tab>
          <Tabs.Tab value="design" leftSection={<IconPalette size={16} />}>
            Design
          </Tabs.Tab>
        </Tabs.List>

        {/* Main Content Area */}
        <Grid gutter="lg" mt="md">
          {/* Left Column - Active Editor */}
          <Grid.Col span={6}>
            <Box>
              <Tabs.Panel value="sections">
                <CvSectionManager />
              </Tabs.Panel>
              <Tabs.Panel value="content">
                {cvIdNumber && <CVContentEditor cvId={cvIdNumber} />}
              </Tabs.Panel>
              <Tabs.Panel value="design" p="md">
                <CVDesignEditor />
              </Tabs.Panel>
            </Box>
          </Grid.Col>
          {/* Right Column - Live Preview */}
          <Grid.Col
            span={6}
            style={{
              borderLeft: "1px solid var(--mantine-color-gray-3)",
            }}
          >
            <Stack gap="xs">
              <Title order={5} pl="xs">
                Preview
              </Title>

              <Box>{cvIdNumber && <CVLivePreviewA4 cvId={cvIdNumber} />}</Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Tabs>
    </Stack>
  );
};
