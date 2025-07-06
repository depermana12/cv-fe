import {
  Card,
  Stack,
  Group,
  Title,
  Badge,
  Menu,
  ActionIcon,
  Text,
  Divider,
  Modal,
  Button,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconPencil,
  IconList,
  IconLock,
  IconWorld,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Cv } from "../../../cv/types/types";
import { useUpdateCv } from "../../../cv/hooks/useUpdateCv";
import { useDeleteCv } from "../../../cv/hooks/useDeleteCv";
import { CvQuickEditModal } from "./CvQuickEditModal";
import { CvFullEditModal } from "./CvFullEditModal";

export const CvGridCard = ({
  cv,
  onSelect,
}: {
  cv: Cv;
  onSelect: (cv: Cv) => void;
}) => {
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [quickEditModalOpened, setQuickEditModalOpened] = useState(false);
  const [fullEditModalOpened, setFullEditModalOpened] = useState(false);
  const updateCv = useUpdateCv();
  const deleteCv = useDeleteCv();

  const handleToggleVisibility = () => {
    updateCv.mutate({ cvId: cv.id, data: { isPublic: !cv.isPublic } });
  };

  const handleDelete = () => {
    deleteCv.mutate(cv.id, { onSuccess: closeDeleteModal });
  };

  return (
    <>
      <Card radius="md" withBorder shadow="sm">
        <Stack>
          <Group justify="space-between" wrap="nowrap">
            <Group gap="sm">
              <Title
                order={3}
                size="h4"
                lineClamp={2}
                onClick={() => onSelect(cv)}
                style={{ cursor: "pointer" }}
              >
                {cv.title}
              </Title>
              <Badge variant="default" size="xs">
                {cv.isPublic ? "Public" : "Private"}
              </Badge>
            </Group>
            <Menu position="bottom-end" withinPortal>
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  aria-label="cv options setting"
                >
                  <IconDots size={16} color="gray" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  onClick={() => onSelect(cv)}
                >
                  Full Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconPencil size={14} />}
                  onClick={() => setQuickEditModalOpened(true)}
                >
                  Quick Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconList size={14} />}
                  onClick={() => setFullEditModalOpened(true)}
                >
                  View All Details
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={
                    cv.isPublic ? (
                      <IconLock size={14} />
                    ) : (
                      <IconWorld size={14} />
                    )
                  }
                  onClick={handleToggleVisibility}
                >
                  Make {cv.isPublic ? "Private" : "Public"}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={openDeleteModal}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text size="sm" lineClamp={2}>
            {cv.description || "No description"}
          </Text>
          <Group>
            <Text size="xs" c="dimmed">
              Created: {new Date(cv.createdAt).toLocaleDateString()}
            </Text>
            <Divider orientation="vertical" size="sm" />
            <Text size="xs" c="dimmed">
              Updated:{" "}
              {cv.updatedAt
                ? new Date(cv.updatedAt).toLocaleDateString()
                : "N/A"}
            </Text>
          </Group>
        </Stack>
      </Card>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Delete CV?"
        centered
      >
        <Text mb="lg">
          This will delete your cv{" "}
          <span style={{ fontWeight: 700 }}>{cv.title}</span>
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            loading={deleteCv.isPending}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <CvQuickEditModal
        opened={quickEditModalOpened}
        onClose={() => setQuickEditModalOpened(false)}
        cvId={cv.id}
      />
      <CvFullEditModal
        opened={fullEditModalOpened}
        onClose={() => setFullEditModalOpened(false)}
        cvId={cv.id}
      />
    </>
  );
};
