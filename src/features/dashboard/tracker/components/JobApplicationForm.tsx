import { useState } from "react";
import {
  Stack,
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Box,
  LoadingOverlay,
  Text,
  Paper,
  Grid,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useForm } from "@tanstack/react-form";

import { useCreateJobApplication } from "../hooks/useCreateJobApplication";
import { useUpdateJobApplication } from "../hooks/useUpdateJobApplication";
import {
  JobApplicationFormProps,
  JobTrackerCreate,
} from "../types/jobTracker.type";
import { jobTrackerCreateSchema } from "../schema/jobTracker";
import { useCvsNonSuspense } from "../../../cv/hooks/useCvs";
import useFieldError from "../../../cv/hooks/useFieldError";
import { zFieldValidator } from "../../../cv/utils/zFieldValidator";

export const JobApplicationForm = (props: JobApplicationFormProps) => {
  const { onClose } = props;
  const isEdit = props.mode === "edit";
  const btnTitle = isEdit ? "Update Application" : "Add Application";

  const [statusChangedAt, setStatusChangedAt] = useState<Date | undefined>(
    undefined,
  );
  const [lastStatus] = useState(
    isEdit && props.initialData ? props.initialData.status : undefined,
  );

  const { mutate: addApplication, isPending: isCreating } =
    useCreateJobApplication();
  const { mutate: updateApplication, isPending: isUpdating } =
    useUpdateJobApplication();
  const { data: cvsResponse, isLoading: cvsLoading } = useCvsNonSuspense();
  const cvs = cvsResponse || [];

  const isLoading = isCreating || isUpdating || cvsLoading;

  const defaultValues =
    isEdit && props.initialData
      ? {
          ...props.initialData,
          appliedAt: props.initialData.appliedAt
            ? new Date(props.initialData.appliedAt)
            : new Date(),
        }
      : {
          cvId: props.initialData?.cvId ?? null,
          jobPortal: props.initialData?.jobPortal ?? "",
          jobUrl: props.initialData?.jobUrl ?? "",
          companyName: props.initialData?.companyName ?? "",
          jobTitle: props.initialData?.jobTitle ?? "",
          jobType: props.initialData?.jobType ?? "Full-time",
          position: props.initialData?.position ?? "Mid-level",
          location: props.initialData?.location ?? "",
          locationType: props.initialData?.locationType ?? "On-site",
          status: props.initialData?.status ?? "applied",
          notes: props.initialData?.notes ?? "",
          appliedAt: props.initialData?.appliedAt
            ? new Date(props.initialData?.appliedAt)
            : new Date(),
        };

  const { Field, handleSubmit } = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      if (isEdit && props.initialData) {
        const updatePayload =
          lastStatus !== value.status && statusChangedAt
            ? { ...value, statusChangedAt }
            : value;
        updateApplication(
          { applicationId: props.initialData.id, data: updatePayload },
          {
            onSuccess: () => {
              onClose();
              notifications.show({
                title: "Success!",
                message: `Job application ${value.jobTitle} has been updated`,
                color: "green",
                position: "top-right",
                autoClose: 4000,
                withCloseButton: true,
              });
            },
          },
        );
      } else {
        addApplication(value, {
          onSuccess: () => {
            onClose();
            notifications.show({
              title: "Success!",
              message: `Job application ${value.jobTitle} has been created`,
              color: "green",
              position: "top-right",
              autoClose: 4000,
              withCloseButton: true,
            });
          },
        });
      }
    },
  });

  const cvOptions = cvs.map((cv) => ({
    value: cv.id.toString(),
    label: cv.title,
  }));

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isLoading} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack gap="lg">
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" fw={600} mb="md">
              Job Information
            </Text>
            <Stack gap="md">
              <Group grow>
                <Field
                  name="companyName"
                  validators={{
                    onBlur: zFieldValidator(
                      jobTrackerCreateSchema.shape.companyName,
                    ),
                  }}
                >
                  {({ state, handleChange, handleBlur }) => (
                    <TextInput
                      label="Company Name"
                      placeholder="Enter company name"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={useFieldError(state.meta)}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
                <Field
                  name="jobTitle"
                  validators={{
                    onBlur: zFieldValidator(
                      jobTrackerCreateSchema.shape.jobTitle,
                    ),
                  }}
                >
                  {({ state, handleChange, handleBlur }) => (
                    <TextInput
                      label="Job Title"
                      placeholder="e.g. Business Analyst"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={useFieldError(state.meta)}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </Group>

              <Group grow>
                <Field name="jobType">
                  {({ state, handleChange }) => (
                    <Select
                      label="Job Type"
                      value={state.value}
                      onChange={(v) =>
                        handleChange(
                          (v as JobTrackerCreate["jobType"]) || "Full-time",
                        )
                      }
                      data={[
                        "Full-time",
                        "Part-time",
                        "Contract",
                        "Internship",
                        "Freelance",
                        "Volunteer",
                      ].map((value) => ({ value, label: value }))}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
                <Field name="position">
                  {({ state, handleChange }) => (
                    <Select
                      label="Position Level"
                      value={state.value}
                      onChange={(v) =>
                        handleChange(
                          (v as JobTrackerCreate["position"]) || "Mid-level",
                        )
                      }
                      data={[
                        "Manager",
                        "Lead",
                        "Senior",
                        "Mid-level",
                        "Junior",
                        "Intern",
                        "Entry-level",
                        "Staff",
                        "Other",
                      ].map((value) => ({ value, label: value }))}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </Group>
              <Group grow>
                <Field
                  name="location"
                  validators={{
                    onBlur: zFieldValidator(
                      jobTrackerCreateSchema.shape.location,
                    ),
                  }}
                >
                  {({ state, handleChange, handleBlur }) => (
                    <TextInput
                      label="Company Location"
                      placeholder="e.g. Jakarta Selatan"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={useFieldError(state.meta)}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
                <Field name="locationType">
                  {({ state, handleChange }) => (
                    <Select
                      label="Work Location Type"
                      value={state.value}
                      onChange={(v) =>
                        handleChange(
                          (v as JobTrackerCreate["locationType"]) || "On-site",
                        )
                      }
                      data={["Remote", "On-site", "Hybrid"].map((v) => ({
                        value: v,
                        label: v,
                      }))}
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </Group>
            </Stack>
          </Paper>

          {/* Application Status & Dates */}
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" fw={600} mb="md">
              Application Status & Timeline
            </Text>
            <Stack gap="md">
              <Group grow>
                <Field name="appliedAt">
                  {({ state, handleChange }) => (
                    <DatePickerInput
                      label="Applied Date"
                      valueFormat="D MMMM YYYY"
                      locale="id"
                      value={state.value}
                      onChange={(v) => handleChange(v || new Date())}
                      maxDate={new Date()}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
                <Field name="status">
                  {({ state, handleChange }) => (
                    <Select
                      label="Application Status"
                      value={state.value}
                      onChange={(v) => {
                        handleChange(
                          (v as JobTrackerCreate["status"]) || "applied",
                        );
                        if (isEdit && v && v !== lastStatus) {
                          setStatusChangedAt(new Date());
                        } else if (isEdit && v === lastStatus) {
                          setStatusChangedAt(undefined);
                        }
                      }}
                      data={[
                        "applied",
                        "interview",
                        "offer",
                        "rejected",
                        "accepted",
                        "ghosted",
                      ].map((v) => ({ value: v, label: v }))}
                      required
                      disabled={isLoading}
                    />
                  )}
                </Field>
                {isEdit && statusChangedAt && props.initialData && (
                  <DatePickerInput
                    label="Status Updated At"
                    value={statusChangedAt}
                    onChange={(value) => setStatusChangedAt(value ?? undefined)}
                    minDate={new Date(props.initialData.appliedAt)}
                    maxDate={new Date()}
                    required
                    disabled={isLoading}
                  />
                )}
              </Group>
            </Stack>
          </Paper>

          {/* Source & Resources */}
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" fw={600} mb="md">
              Source & Resources
            </Text>
            <Stack gap="sm">
              <Grid>
                <Grid.Col span={4}>
                  <Field
                    name="jobPortal"
                    validators={{
                      onBlur: zFieldValidator(
                        jobTrackerCreateSchema.shape.jobPortal,
                      ),
                    }}
                  >
                    {({ state, handleChange, handleBlur }) => (
                      <TextInput
                        label="Job Portal"
                        placeholder="e.g. LinkedIn"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={useFieldError(state.meta)}
                        required
                        disabled={isLoading}
                      />
                    )}
                  </Field>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Field name="jobUrl">
                    {({ state, handleChange, handleBlur }) => (
                      <TextInput
                        label="Job URL"
                        placeholder="e.g. https://example.com/job"
                        value={state.value || ""}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={useFieldError(state.meta)}
                        disabled={isLoading}
                      />
                    )}
                  </Field>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Field name="cvId">
                    {({ state, handleChange }) => (
                      <Select
                        label="CV Used"
                        value={state.value?.toString() || ""}
                        onChange={(v) => handleChange(v ? parseInt(v) : null)}
                        data={cvOptions}
                        clearable
                        disabled={isLoading}
                        placeholder="Select your cv"
                      />
                    )}
                  </Field>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>

          {/* Notes */}
          <Paper p="md" radius="md" withBorder bg="var(--mantine-color-gray-0)">
            <Text size="sm" fw={600} mb="md">
              Additional Notes
            </Text>
            <Field name="notes">
              {({ state, handleChange, handleBlur }) => (
                <Textarea
                  label="Notes"
                  value={state.value || ""}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={useFieldError(state.meta)}
                  rows={4}
                  disabled={isLoading}
                  placeholder="Add any additional notes about this application..."
                />
              )}
            </Field>
          </Paper>
        </Stack>

        {/* Sticky Action Buttons */}
        <Box
          pos="sticky"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          style={{
            borderTop: "1px solid var(--mantine-color-gray-3)",
            marginLeft: "-1rem",
            marginRight: "-1rem",
            marginBottom: "-1rem",
            zIndex: 100,
          }}
          p="md"
        >
          <Group justify="flex-end" gap="md">
            <Button
              variant="default"
              color="gray"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              loading={isLoading}
              disabled={isLoading}
              color="blue"
            >
              {btnTitle}
            </Button>
          </Group>
        </Box>
      </form>
    </Box>
  );
};
