import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { signUpSchema, type SignUp } from "../schema/auth.schema";
import { useSignUp } from "../hooks/useSignUp";
import {
  Box,
  Button,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
  Text,
  Divider,
  Progress,
  Popover,
} from "@mantine/core";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import useFieldError from "@shared/hooks/useFieldError";
import { IconBrandGoogle, IconX, IconCheck } from "@tabler/icons-react";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const SignUpForm = () => {
  const { mutate, isPending } = useSignUp();
  const [popoverOpened, setPopoverOpened] = useState(false);

  const defaultSignUpForm: SignUp = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultSignUpForm,
    onSubmit: async ({ value }) => mutate(value),
    validators: {
      onSubmit: signUpSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box pos="relative">
        <LoadingOverlay
          zIndex={1000}
          visible={state.isSubmitting || isPending}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack gap="xs">
          <Field
            name="username"
            validators={{
              onBlur: zFieldValidator(signUpSchema.innerType().shape.username),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  label="Username"
                  placeholder="Your username"
                  autoComplete="username"
                  required
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={errorField}
                />
              );
            }}
          />
          <Field
            name="email"
            validators={{
              onBlur: zFieldValidator(signUpSchema.innerType().shape.email),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  label="Email"
                  placeholder="you@kodedroid.com"
                  inputMode="email"
                  autoComplete="email"
                  required
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={errorField}
                />
              );
            }}
          />
          <Field
            name="password"
            validators={{
              onBlur: zFieldValidator(signUpSchema.innerType().shape.password),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              const checks = requirements.map((requirement, index) => (
                <PasswordRequirement
                  key={index}
                  label={requirement.label}
                  meets={requirement.re.test(state.value)}
                />
              ));
              const strength = getStrength(state.value);
              const color =
                strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

              return (
                <Popover
                  opened={popoverOpened}
                  position="bottom"
                  width="target"
                  transitionProps={{ transition: "pop" }}
                >
                  <Popover.Target>
                    <div
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        id={name}
                        name={name}
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        error={errorField}
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb="xs" />
                    <PasswordRequirement
                      label="Includes at least 6 characters"
                      meets={state.value.length > 5}
                    />
                    {checks}
                  </Popover.Dropdown>
                </Popover>
              );
            }}
          />
          <Field
            name="confirmPassword"
            validators={{
              onBlur: zFieldValidator(
                signUpSchema.innerType().shape.confirmPassword,
              ),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={errorField}
                />
              );
            }}
          />
          <Button
            fullWidth
            variant="filled"
            type="submit"
            mt="xl"
            loading={isPending}
            loaderProps={{ type: "dots", color: "indigo" }}
            disabled={isPending || state.isSubmitting}
          >
            Sign Up
          </Button>
        </Stack>

        <Divider my="xs" label="or" labelPosition="center" />
        <Button
          variant="default"
          fullWidth
          leftSection={<IconBrandGoogle size={16} />}
          component="a"
          href="#"
        >
          Continue with Google
        </Button>
      </Box>
    </form>
  );
};
export default SignUpForm;
