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
  IconArrowLeft,
  IconPalette,
  IconFileText,
  IconPencil,
  IconList,
} from "@tabler/icons-react";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useQuery } from "@tanstack/react-query";
import { cvQuery } from "../../../hooks/query";
import { CVContentEditor } from "./CVContentEditor";
import { CVDesignEditor } from "./CVDesignEditor";
import { CVLivePreviewA4 } from "../../../components/CVLivePreviewA4";
import { CvSectionManager } from "./CvSectionManager";

type CVBuilderWrapperProps = {
  onBack?: () => void;
};

export const CVBuilderWrapper = ({ onBack }: CVBuilderWrapperProps) => {
  const [activeTab, setActiveTab] = useState<"sections" | "content" | "design">(
    "sections",
  );
  const { activeCvId } = useCvStore();
  const { loadSectionsForCv } = useCVSectionStore();
  const { data: cv, isLoading } = useQuery(cvQuery(activeCvId!));

  // Load sections for the current CV when it changes
  useEffect(() => {
    if (activeCvId) {
      loadSectionsForCv(activeCvId);
    }
  }, [activeCvId, loadSectionsForCv]);

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
          {onBack && (
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={24} />}
              onClick={onBack}
            ></Button>
          )}

          <Title order={3}>{cv.title}</Title>
        </Group>

        <Button leftSection={<IconFileText size={16} />}>Export</Button>
      </Group>

      {/* Tabs Header */}
      <Tabs
        value={activeTab}
        variant="outline"
        onChange={(value) =>
          setActiveTab(value as "sections" | "content" | "design")
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
                <CVContentEditor cvId={cv.id} />
              </Tabs.Panel>
              <Tabs.Panel value="design" p="md">
                <CVDesignEditor cvId={cv.id} />
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
