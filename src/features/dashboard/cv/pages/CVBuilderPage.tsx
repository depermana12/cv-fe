import { useEffect, useState } from "react";
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
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconPalette,
  IconFileText,
  IconPencil,
  IconList,
} from "@tabler/icons-react";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useQuery } from "@tanstack/react-query";
import { cvQuery } from "@features/dashboard/cv/hooks/query";
import { CVContentEditor } from "@features/dashboard/cv/sections/builder/components/CVContentEditor";
import { CVDesignEditor } from "@features/dashboard/cv/sections/builder/components/CVDesignEditor";
import { CVLivePreviewA4 } from "@features/dashboard/cv/components/CVLivePreviewA4";
import { CvSectionManager } from "@features/dashboard/cv/sections/builder/components/CvSectionManager";
import { useNavigate, useParams } from "@tanstack/react-router";

export const CvBuilderPage = () => {
  const [activeTab, setActiveTab] = useState<
    "sections" | "content" | "design" | null
  >("content");

  const { setActiveCvId } = useCvStore();
  const { loadSectionsForCv } = useCVSectionStore();

  const { cvId } = useParams({ from: "/dashboard/cv/library/$cvId" });
  const cvIdNumber = +cvId;
  const navigate = useNavigate();

  const { data: cv, isLoading } = useQuery(cvQuery(cvIdNumber));

  // Set active CV and load sections when component mounts
  useEffect(() => {
    if (cvIdNumber) {
      setActiveCvId(cvIdNumber);
      loadSectionsForCv(cvIdNumber);
    }
  }, [cvIdNumber, setActiveCvId, loadSectionsForCv]);

  const handleBackToLibrary = () => {
    navigate({
      to: "/dashboard/cv/library",
    });
  };
  if (isLoading) {
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
      <Group justify="space-between" pt="md">
        <Group gap="md">
          <Tooltip label="Back to Library">
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={handleBackToLibrary}
            >
              <IconArrowLeft size={24} />
            </ActionIcon>
          </Tooltip>

          <Title order={3} size="h4">
            {cv.title}
          </Title>
        </Group>

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
                <CVContentEditor cvId={cvIdNumber} />
              </Tabs.Panel>
              <Tabs.Panel value="design" p="md">
                <CVDesignEditor cvId={cvIdNumber} />
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

              <Box>
                <CVLivePreviewA4 />
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Tabs>
    </Stack>
  );
};
