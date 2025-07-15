import { useState } from "react";
import {
  Stack,
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Card,
  Box,
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
import { useCvs } from "../../../cv/hooks/useCvs";
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
  const { data: cvsResponse } = useCvs();
  const cvs = cvsResponse || [];

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

  const isLoading = isCreating || isUpdating;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Card padding="md" radius="md" withBorder>
        <Stack gap="md">
          <Field
            name="companyName"
            validators={{
              onBlur: zFieldValidator(jobTrackerCreateSchema.shape.companyName),
            }}
          >
            {({ state, handleChange, handleBlur }) => (
              <TextInput
                label="Company Name"
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
              onBlur: zFieldValidator(jobTrackerCreateSchema.shape.jobTitle),
            }}
          >
            {({ state, handleChange, handleBlur }) => (
              <TextInput
                label="Job Title"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={useFieldError(state.meta)}
                required
                disabled={isLoading}
              />
            )}
          </Field>
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
                onBlur: zFieldValidator(jobTrackerCreateSchema.shape.location),
              }}
            >
              {({ state, handleChange, handleBlur }) => (
                <TextInput
                  label="Company Location"
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
          <Group grow>
            <Field
              name="jobPortal"
              validators={{
                onBlur: zFieldValidator(jobTrackerCreateSchema.shape.jobPortal),
              }}
            >
              {({ state, handleChange, handleBlur }) => (
                <TextInput
                  label="Job Portal"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={useFieldError(state.meta)}
                  required
                  disabled={isLoading}
                />
              )}
            </Field>
            <Field name="jobUrl">
              {({ state, handleChange, handleBlur }) => (
                <TextInput
                  label="Job URL"
                  value={state.value || ""}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={useFieldError(state.meta)}
                  disabled={isLoading}
                />
              )}
            </Field>
          </Group>
          <Grid>
            <Grid.Col span={6}>
              <Field name="cvId">
                {({ state, handleChange }) => (
                  <Select
                    label="CV Used"
                    value={state.value?.toString() || ""}
                    onChange={(v) => handleChange(v ? parseInt(v) : null)}
                    data={cvOptions}
                    clearable
                    disabled={isLoading}
                  />
                )}
              </Field>
            </Grid.Col>
          </Grid>
          <Field name="notes">
            {({ state, handleChange, handleBlur }) => (
              <Textarea
                label="Notes"
                value={state.value || ""}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={useFieldError(state.meta)}
                rows={3}
                disabled={isLoading}
              />
            )}
          </Field>
        </Stack>
      </Card>

      <Box
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            loading={isLoading}
            disabled={isLoading}
          >
            {btnTitle}
          </Button>
        </Group>
      </Box>
    </form>
  );
};
