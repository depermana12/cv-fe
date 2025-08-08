import {
  ActionIcon,
  Badge,
  Group,
  Stack,
  Text,
  Title,
  Menu,
  Paper,
} from "@mantine/core";
import { IconFileCv, IconDots } from "@tabler/icons-react";
import { Cv } from "@features/dashboard/cv/types/types";
import { useUpdateCv } from "../../cv/hooks/useUpdateCv";
import { CvQuickEditModal } from "../../cv/components/CvQuickEditModal";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const CvCardItem = ({ cv }: { cv: Cv }) => {
  const [cvToEdit, setCvToEdit] = useState<Cv | null>(null);
  const updateCv = useUpdateCv();
  const navigate = useNavigate();

  const [
    quickEditModalOpened,
    { open: openQuickEditModal, close: closeQuickEditModal },
  ] = useDisclosure(false);

  const formattedCreatedAt = new Date(cv.createdAt).toLocaleDateString(
    "en-ID",
    { day: "numeric", month: "short", year: "numeric" },
  );

  const handleToggleVisibility = (cv: Cv) => {
    updateCv.mutate({ cvId: cv.id, data: { isPublic: !cv.isPublic } });
  };

  const handleOpenQuickEditModal = (cv: Cv) => {
    setCvToEdit(cv);
    openQuickEditModal();
  };

  const handleCloseQuickEditModal = () => {
    closeQuickEditModal();
    setCvToEdit(null);
  };

  const handleCvSelect = (cv: Cv) => {
    navigate({
      to: "/dashboard/cv/library/$cvId",
      params: { cvId: cv.id.toString() },
    });
  };

  return (
    <>
      <Paper p="xs" radius="sm" withBorder>
        <Group justify="space-between">
          <Group gap="sm">
            <Stack justify="center" align="center">
              <IconFileCv size={32} stroke={1.2} />
            </Stack>

            <Stack gap={0}>
              <Group>
                <Title
                  order={5}
                  fw={500}
                  size="md"
                  lineClamp={1}
                  onClick={() => handleCvSelect(cv)}
                  style={{ cursor: "pointer" }}
                >
                  {cv.title}
                </Title>

                <Badge
                  variant="filled"
                  size="xs"
                  color={cv.isPublic ? "green" : "gray"}
                >
                  {cv.isPublic ? "Public" : "Private"}
                </Badge>
              </Group>

              <Text size="xs" c="dimmed">
                {formattedCreatedAt}
              </Text>
            </Stack>
          </Group>
          <Group gap="xs">
            <Menu position="bottom-end" withinPortal>
              <Menu.Target>
                <ActionIcon
                  size="md"
                  aria-label="More options"
                  variant="transparent"
                >
                  <IconDots size={16} color="gray" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => handleOpenQuickEditModal(cv)}>
                  Quick edit
                </Menu.Item>

                <Menu.Item onClick={() => handleToggleVisibility(cv)}>
                  Make {cv.isPublic ? "Private" : "Public"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Paper>
      {/* Quick Edit Modal lifted to parent */}
      <CvQuickEditModal
        opened={quickEditModalOpened}
        onClose={handleCloseQuickEditModal}
        cvId={cvToEdit?.id ?? null}
      />
    </>
  );
};
