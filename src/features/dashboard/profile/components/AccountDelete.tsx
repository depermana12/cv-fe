import {
  Group,
  Title,
  Stack,
  Button,
  Text,
  Alert,
  Modal,
  PasswordInput,
  Paper,
} from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { AccountInformationProps } from "../types/profile.type";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteUser } from "@/features/user/hooks/useDeleteUser";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { clearAuthToken } from "@/shared/utils/authHelpers";

export const AccountDelete = (user: AccountInformationProps) => {
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const { mutate: deleteAccount, isPending } = useDeleteUser();

  const handleDeleteAccount = () => {
    deleteAccount(
      { password },
      {
        onSuccess: () => {
          closeDeleteModal();
          navigate({ to: "/auth/signin" });
          clearAuthToken();
        },
      },
    );
  };

  const handleCloseDeleteModal = () => {
    setPassword("");
    closeDeleteModal();
  };

  return (
    <Paper p="lg" bg="red.0" withBorder>
      <Group gap="sm" mb="md">
        <IconAlertTriangle size={20} />
        <Title order={4}>Delete Account</Title>
      </Group>

      <Stack gap="md">
        <Stack justify="space-between">
          <Text size="sm">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </Text>

          <Button
            variant="outline"
            color="red.5"
            size="sm"
            onClick={openDeleteModal}
          >
            Delete Account
          </Button>
        </Stack>
      </Stack>
      {/* Delete Account Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={handleCloseDeleteModal}
        title={`Delete "${user.user.username}" Account?`}
        centered
      >
        <Stack gap="md">
          <Alert color="red" icon={<IconAlertTriangle size={20} />}>
            This will permanently delete your account and remove all associated
            data. This action cannot be undone.
          </Alert>
          <PasswordInput
            label="Password"
            placeholder="Enter your password to confirm"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteAccount}
              disabled={!password}
              loading={isPending}
            >
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Paper>
  );
};
