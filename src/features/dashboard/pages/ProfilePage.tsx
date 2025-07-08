import { Suspense, useEffect, useMemo, useState } from "react";
import {
  Stack,
  Group,
  Title,
  Text,
  Card,
  Avatar,
  Button,
  Badge,
  Divider,
  Grid,
  Skeleton,
  Modal,
  FileInput,
  TextInput,
  Select,
  LoadingOverlay,
  Anchor,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCamera, IconUpload } from "@tabler/icons-react";
import { useDisclosure, useInterval, useTimeout } from "@mantine/hooks";
import { useForm } from "@tanstack/react-form";
import { DatePickerInput } from "@mantine/dates";
import { useUser } from "../../user/hooks/useUser";
import { useUpdateProfile } from "../../user/hooks/useUpdateProfile";
import { useSendEmailVerification } from "../../user/hooks/useSendEmailVerification";
import useFieldError from "../../cv/hooks/useFieldError";
import { zFieldValidator } from "../../cv/utils/zFieldValidator";
import { userUpdateSchema } from "../../user/schema/user";
import { useUploadPP } from "../../user/hooks/useUploadPP";

const ProfileContent = () => {
  const { data: user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { mutate: sendVerificationEmail, isPending: isSendingEmail } =
    useSendEmailVerification();
  const [emailSent, setEmailSent] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(0);
  const interval = useInterval(() => setRetrySeconds((s) => s - 1), 1000);
  const timeout = useTimeout(() => setEmailSent(false), 30000);
  const [
    avatarModalOpened,
    { open: openAvatarModal, close: closeAvatarModal },
  ] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { mutate: uploadPP, isPending: isUpdating } = useUploadPP();

  const handleSendVerification = async () => {
    if (isSendingEmail || retrySeconds > 0) return;
    sendVerificationEmail(undefined, {
      onSuccess: () => {
        setEmailSent(true);
        setRetrySeconds(30);
        interval.start();
        timeout.start();
      },
    });
  };

  useEffect(() => {
    if (retrySeconds === 0) {
      interval.stop();
    }
  }, [retrySeconds, interval]);

  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthDate: user?.birthDate ? new Date(user.birthDate) : null,
      gender: user?.gender || null,
    },
    onSubmit: async ({ value }) => {
      if (!state.isDirty) return;
      updateProfile(value, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    },
  });

  const avatarInitials = useMemo(() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.username ? user.username[0].toUpperCase() : "n/a";
  }, [user.firstName, user.lastName, user.username]);

  const cdn = import.meta.env.VITE_CDN;
  const constructImageUrl = (key: string | null | undefined) => {
    return key ? `${cdn}/${key?.replace(/^uploads\//, "")}` : null;
  };
  const profileImageUrl = constructImageUrl(user.profileImage);

  const resetModal = () => {
    setFile(null);
    setPreviewUrl(null);
    closeAvatarModal();
  };

  const handleUploadPP = () => {
    if (!file) return;
    uploadPP(file, {
      onSuccess: (key) => {
        updateProfile(
          { profileImage: key },
          {
            onSuccess: resetModal,
          },
        );
      },
    });
  };

  const handleDeletePP = () => {
    updateProfile({ profileImage: null });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={2}>Profile</Title>
          <Text c="dimmed">
            Manage your personal information and account settings
          </Text>
        </Stack>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card padding="lg" radius="md">
            <Stack align="center" gap="md">
              <Title order={4}>Profile Picture</Title>

              <Box pos="relative">
                <Avatar
                  src={previewUrl || profileImageUrl}
                  size={200}
                  radius={200}
                  color="blue"
                  sx={(theme) => ({
                    background: isDark
                      ? theme.colors.dark[5]
                      : theme.colors.gray[2],
                    border: "2px solid transparent",
                  })}
                >
                  {avatarInitials}
                </Avatar>
                <Button
                  size="xs"
                  variant="default"
                  leftSection={<IconCamera size={14} />}
                  onClick={openAvatarModal}
                  pos="absolute"
                  bottom={0}
                  right={0}
                >
                  Edit
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Basic Information</Title>
            </Group>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <LoadingOverlay visible={state.isSubmitting || isPending} />
              <Stack gap="md">
                <Group justify="center" gap="md" grow>
                  <Field
                    name="firstName"
                    validators={{
                      onBlur: zFieldValidator(userUpdateSchema.shape.firstName),
                    }}
                  >
                    {({ state, name, handleChange, handleBlur }) => (
                      <TextInput
                        name={name}
                        label="First Name"
                        placeholder="Enter your first name"
                        value={state.value || ""}
                        error={
                          isEditing ? useFieldError(state.meta) : undefined
                        }
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        disabled={!isEditing}
                      />
                    )}
                  </Field>
                  <Field
                    name="lastName"
                    validators={{
                      onBlur: zFieldValidator(userUpdateSchema.shape.lastName),
                    }}
                  >
                    {({ state, name, handleChange, handleBlur }) => (
                      <TextInput
                        name={name}
                        label="Last Name"
                        placeholder="Enter your last name"
                        value={state.value || ""}
                        error={
                          isEditing ? useFieldError(state.meta) : undefined
                        }
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        disabled={!isEditing}
                      />
                    )}
                  </Field>
                </Group>

                <Group justify="center" gap="md" grow>
                  <Field
                    name="birthDate"
                    validators={{
                      onBlur: zFieldValidator(userUpdateSchema.shape.birthDate),
                    }}
                  >
                    {({ state, name, handleChange, handleBlur }) => (
                      <DatePickerInput
                        name={name}
                        label="Birth Date"
                        placeholder="Select your birth date"
                        value={state.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          isEditing ? useFieldError(state.meta) : undefined
                        }
                        maxDate={new Date()}
                        disabled={!isEditing}
                      />
                    )}
                  </Field>
                  <Field
                    name="gender"
                    validators={{
                      onBlur: zFieldValidator(userUpdateSchema.shape.gender),
                    }}
                  >
                    {({ state, name, handleChange, handleBlur }) => (
                      <Select
                        name={name}
                        label="Gender"
                        placeholder="Select your gender"
                        value={state.value}
                        data={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        onChange={(value) =>
                          handleChange(value as "male" | "female" | null)
                        }
                        onBlur={handleBlur}
                        error={
                          isEditing ? useFieldError(state.meta) : undefined
                        }
                        clearable
                        disabled={!isEditing}
                      />
                    )}
                  </Field>
                </Group>

                <Group justify="space-between" mt="md">
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Group>
                      <Button
                        variant="default"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        type="submit"
                        loading={state.isSubmitting || isPending}
                        disabled={!state.isDirty}
                      >
                        Save Changes
                      </Button>
                    </Group>
                  )}
                </Group>
              </Stack>
            </form>
          </Card>

          <Card padding="lg" radius="md" withBorder mt="lg">
            <Group gap="sm" mb="md">
              <Title order={4}>Account Information</Title>
            </Group>

            <Stack gap="md">
              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    Username
                  </Text>
                  <Text size="sm" c="dimmed">
                    @{user.username}
                  </Text>
                </Stack>
              </Group>
              <Group justify="space-between">
                <Stack gap={4}>
                  <Group gap="xs">
                    <Text size="sm" fw={500}>
                      Email
                    </Text>
                    <Badge
                      size="xs"
                      variant="light"
                      color={user.isEmailVerified ? "green" : "orange"}
                    >
                      {user.isEmailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {user.email}
                  </Text>
                  {!user.isEmailVerified && (
                    <Anchor
                      size="xs"
                      c={emailSent ? "blue" : "orange"}
                      onClick={handleSendVerification}
                      style={{
                        cursor:
                          isSendingEmail || retrySeconds > 0
                            ? "not-allowed"
                            : "pointer",
                        opacity: isSendingEmail || retrySeconds > 0 ? 0.6 : 1,
                      }}
                      fw={500}
                    >
                      {isSendingEmail
                        ? "Sending..."
                        : emailSent && retrySeconds > 0
                          ? `Sent! retry in ${retrySeconds}s`
                          : "Send verification email"}
                    </Anchor>
                  )}
                </Stack>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    Member since
                  </Text>
                  <Text size="sm" c="dimmed">
                    {new Date(user.createdAt).toLocaleDateString("en-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Modal
        opened={avatarModalOpened}
        onClose={resetModal}
        title="Update Profile Picture"
        centered
      >
        <Stack gap="md">
          <FileInput
            label="Profile Picture"
            description="Upload a square photo with a minimum size of 300×300px"
            placeholder="Select image file"
            clearable
            accept="image/*"
            leftSection={<IconUpload size={16} />}
            value={file}
            onChange={(file) => {
              setFile(file);
              setPreviewUrl(file ? URL.createObjectURL(file) : null);
            }}
          />
          <Group justify="flex-start">
            <Button
              variant="outline"
              onClick={handleUploadPP}
              disabled={!file || isUpdating}
              loading={isUpdating}
            >
              Upload
            </Button>
            {user.profileImage ? (
              <Button color="red" onClick={handleDeletePP}>
                Remove
              </Button>
            ) : null}
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

const ProfileLoading = () => (
  <Stack gap="lg">
    <Group justify="space-between">
      <Stack gap="xs">
        <Skeleton height={32} width={120} />
        <Skeleton height={16} width={300} />
      </Stack>
      <Skeleton height={36} width={120} />
    </Group>
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Card padding="lg" radius="md" withBorder>
          <Skeleton height={24} width={200} mb="md" />
          <Stack gap="md">
            <Group grow>
              <Skeleton height={60} />
              <Skeleton height={60} />
            </Group>
            <Skeleton height={60} />
            <Skeleton height={60} />
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card padding="lg" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Skeleton height={80} width={80} radius="xl" />
            <Stack gap="xs" align="center">
              <Skeleton height={16} width={120} />
              <Skeleton height={14} width={80} />
            </Stack>
            <Skeleton height={32} width={100} />
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  </Stack>
);

export const ProfilePage = () => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
};
