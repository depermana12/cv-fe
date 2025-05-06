import { useForm } from "@tanstack/react-form";
import { personalCreateSchema } from "../schema/personalSchema";
import type { PersonalForm } from "../types/types";
import { useCreatePersonal } from "../hooks/useCreatePersonal";
import { useAuthStore } from "../../auth/store/authStore";
import {
  Box,
  Button,
  FileInput,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
  Image,
  Group,
} from "@mantine/core";
import { IconCameraUp } from "@tabler/icons-react";
import { z } from "zod";
import useFieldError from "../hooks/useFieldError";
import { useState } from "react";
import {
  getImage,
  requestSignedUrl,
  uploadFile,
} from "../services/uploadService";

const personalFieldSchema = personalCreateSchema.shape;

const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const zFieldValidator =
  <T,>(schema: z.ZodType<T>) =>
  ({ value }: { value: T }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues;
  };

const PersonalForm = () => {
  const { mutate, isPending, isError } = useCreatePersonal();
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!user) throw new Error("User must be logged in to use PersonalForm");

  const defaultPersonalInputValues: PersonalForm = {
    userId: user.id,
    fullName: "",
    bio: "",
    image: "",
    summary: "",
    phone: "",
    email: "",
    url: "",
  };

  const validateFile = (file: File) => {
    if (!file) {
      return { isValid: false, error: "File is required" };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "File size must be less than 1MB" };
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: `File type ${file.type} not supported. Only ${ALLOWED_FILE_TYPES.join(", ")} are allowed.`,
      };
    }
    return { isValid: true, error: null };
  };

  const handleFileChange = (newFile: File | null) => {
    if (!newFile) {
      setFile(null);
      setFileError(null);
      setUploadedImageUrl("");
      return;
    }

    setFile(newFile);
    setUploadedImageUrl("");

    const validation = validateFile(newFile);
    if (!validation.isValid) {
      setFileError(validation.error);
      return;
    }

    setFileError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setFileError("plese select a file to upload");
      return;
    }

    const validation = validateFile(file);
    if (!validation.isValid) {
      setFileError(validation.error);
      return;
    }

    try {
      setUploading(true);
      // 1. request a presigned URL from backend
      const signedUrl = await requestSignedUrl(file.type);
      const { url, key } = signedUrl.data.data;
      console.log("signed url:", url, key);

      // 2. upload file directly to S3 using the presigned URL
      await uploadFile(url, file);

      // 3. get the URL to view the uploaded image
      const getImageUrl = await getImage(key);
      const { url: imageUrl } = getImageUrl.data.data;
      console.log("image url:", imageUrl);

      // 4. set the uploaded image URL to the state
      setUploadedImageUrl(imageUrl);

      setFileError(null);
    } catch (err) {
      // TODO: handle error properly
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultPersonalInputValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: personalCreateSchema,
    },
  });
  // to utilize mantine's built-in prop error: red-border input, text positioning
  // and field validation onBlur, the error only show if the input isDirty and notValid
  // the logic is extracted into useFieldError hook with formatFieldError util
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LoadingOverlay visible={state.isSubmitting || isPending || uploading} />
      <Stack gap="md">
        {uploadedImageUrl && (
          <Box mb="md">
            <Image
              src={uploadedImageUrl}
              alt="Profile preview"
              width={200}
              height={200}
              radius="md"
              fit="cover"
            />
          </Box>
        )}
        <Field
          name="image"
          children={({ state, name, handleChange }) => {
            const errorField = useFieldError(state.meta);
            return (
              <>
                <FileInput
                  name={name}
                  label="Profile Image"
                  placeholder="Upload your image"
                  description="Max 1MB, PNG/JPG formats only"
                  leftSection={<IconCameraUp size={18} />}
                  accept="image/jpeg,image/png,image/jpg"
                  value={file}
                  onChange={handleFileChange}
                  clearable
                  error={errorField || fileError}
                />
                <Group mt="xs" justify="flex-end">
                  <Button
                    size="sm"
                    onClick={async () => {
                      await handleUpload();
                      // after upload completes, check for the updated URL and update the form field
                      // the uploadedImageUrl state will be updated in handleUpload
                      if (uploadedImageUrl) {
                        handleChange(uploadedImageUrl);
                      }
                    }}
                    loading={uploading}
                    disabled={!file || !!fileError}
                  >
                    Upload Image
                  </Button>
                </Group>
                {/* hidden input to store the actual image URL */}
                <input
                  type="hidden"
                  name="image"
                  value={state.value || ""}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </>
            );
          }}
        ></Field>
        <Field
          name="fullName"
          validators={{
            onBlur: zFieldValidator(personalFieldSchema.fullName),
          }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Full Name"
                defaultValue={state.value}
                placeholder="John Doe"
                description="Enter your full name"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>

        <Field
          name="bio"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.bio) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Bio"
                defaultValue={state.value}
                placeholder="Frontend Developer"
                description="Optional short title or tagline"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="summary"
          validators={{
            onBlur: zFieldValidator(personalFieldSchema.summary),
          }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <Textarea
                name={name}
                label="Professional Summary"
                defaultValue={state.value}
                placeholder="Summarize your career goals and background"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="phone"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.phone) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Phone"
                defaultValue={state.value}
                placeholder="+6281234567890"
                description="Include your country code"
                type="tel"
                inputMode="tel"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="email"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.email) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Email"
                defaultValue={state.value}
                placeholder="you@example.com"
                description="Email address"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
                type="email"
                inputMode="email"
              />
            );
          }}
        </Field>
        <Field
          name="url"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.url) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Portfolio or Website"
                defaultValue={state.value}
                placeholder="https://yourportfolio.com"
                description="Optional but recommended if you have work online"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
                type="url"
                inputMode="url"
              />
            );
          }}
        </Field>

        <Button
          fullWidth
          type="submit"
          size="md"
          mt="md"
          loading={isPending || state.isSubmitting}
          disabled={isPending || state.isSubmitting}
        >
          {isPending || state.isSubmitting
            ? "Submitting..."
            : "Save Personal Information"}
        </Button>
        {isError && (
          <div className="mt-2 text-red-500">
            Something went wrong. Please try again.
          </div>
        )}
      </Stack>
    </form>
  );
};
export default PersonalForm;
