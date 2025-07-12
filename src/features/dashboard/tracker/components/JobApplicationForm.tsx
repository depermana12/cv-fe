import {
  Stack,
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Card,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@tanstack/react-form";
import { useCreateJobApplication } from "../hooks/useCreateJobApplication";
import {
  JobApplicationFormProps,
  JobTrackerCreate,
} from "../types/jobTracker.type";
import { jobTrackerCreateSchema } from "../schema/jobTracker";
import { useCvs } from "../../../cv/hooks/useCvs";
import useFieldError from "../../../cv/hooks/useFieldError";
import { zFieldValidator } from "../../../cv/utils/zFieldValidator";
import { notifications } from "@mantine/notifications";

export const JobApplicationForm = ({
  initialData,
  onClose,
  mode = "edit",
}: JobApplicationFormProps) => {
  const { mutate: addApplication, isPending } = useCreateJobApplication();
  const { data: cvsResponse } = useCvs();
  const cvs = cvsResponse || [];

  const defaultValues: JobTrackerCreate = {
    cvId: initialData?.cvId || null,
    jobPortal: initialData?.jobPortal || "",
    jobUrl: initialData?.jobUrl || "",
    companyName: initialData?.companyName || "",
    jobTitle: initialData?.jobTitle || "",
    jobType: initialData?.jobType || "Full-time",
    position: initialData?.position || "Mid-level",
    location: initialData?.location || "",
    locationType: initialData?.locationType || "On-site",
    status: initialData?.status || "applied",
    notes: initialData?.notes || "",
    appliedAt: new Date(),
  };

  const { Field, handleSubmit } = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      addApplication(value, {
        onSuccess: () => {
          onClose();
          notifications.show({
            title: "Success!",
            message: `Job application ${value.jobTitle} has been ${mode === "create" ? "created" : "updated"}`,
            color: "green",
            position: "top-right",
            autoClose: 4000,
            withCloseButton: true,
          });
        },
      });
    },
  });

  const cvOptions = cvs.map((cv) => ({
    value: cv.id.toString(),
    label: cv.title,
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Card padding="md" radius="md" withBorder>
        <Stack gap="md">
          {/* Company Name */}
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
              />
            )}
          </Field>

          {/* Job Title */}
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
              />
            )}
          </Field>

          {/* Location */}
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
              />
            )}
          </Field>

          {/* Job Type & Position */}
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
                />
              )}
            </Field>
          </Group>

          {/* Location Type & Status */}
          <Group grow>
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
                />
              )}
            </Field>

            <Field name="status">
              {({ state, handleChange }) => (
                <Select
                  label="Application Status"
                  value={state.value}
                  onChange={(v) =>
                    handleChange((v as JobTrackerCreate["status"]) || "applied")
                  }
                  data={[
                    "applied",
                    "interview",
                    "offer",
                    "rejected",
                    "accepted",
                    "ghosted",
                  ].map((v) => ({ value: v, label: v }))}
                  required
                />
              )}
            </Field>
          </Group>

          {/* Job Portal & Applied Date */}
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
                />
              )}
            </Field>
            <Field name="appliedAt">
              {({ state, handleChange }) => (
                <DatePickerInput
                  label="Applied Date"
                  value={state.value}
                  onChange={(v) => handleChange(v || new Date())}
                  maxDate={new Date()}
                  required
                />
              )}
            </Field>
          </Group>

          {/* Job URL */}
          <Field name="jobUrl">
            {({ state, handleChange, handleBlur }) => (
              <TextInput
                label="Job URL"
                value={state.value || ""}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={useFieldError(state.meta)}
              />
            )}
          </Field>

          {/* CV ID */}
          <Field name="cvId">
            {({ state, handleChange }) => (
              <Select
                label="CV Used"
                value={state.value?.toString() || ""}
                onChange={(v) => handleChange(v ? parseInt(v) : null)}
                data={cvOptions}
                clearable
              />
            )}
          </Field>

          {/* Notes */}
          <Field name="notes">
            {({ state, handleChange, handleBlur }) => (
              <Textarea
                label="Notes"
                value={state.value || ""}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={useFieldError(state.meta)}
                rows={3}
              />
            )}
          </Field>
        </Stack>
      </Card>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="outline" loading={isPending}>
          {initialData ? "Update Application" : "Add Application"}
        </Button>
      </Group>
    </form>
  );
};
