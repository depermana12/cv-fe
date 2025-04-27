import { useForm } from "@tanstack/react-form";
import { signUpSchema, type SignUp } from "../types/auth.schema";
import { useSignUp } from "../hooks/useSignUp";

const SignUpForm = () => {
  const { mutate } = useSignUp();

  const defaultSignUpForm: SignUp = { username: "", email: "", password: "" };

  const form = useForm({
    defaultValues: defaultSignUpForm,
    onSubmit: async ({ value }) => {
      console.log("submitting", value);
      mutate(value);
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <form.Field
          name="username"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Username</label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border p-2 w-full"
              />
              {field.state.meta.errors ? (
                <p className="text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        />
      </div>

      <div>
        <form.Field
          name="email"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Email</label>
              <input
                type="email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border p-2 w-full"
              />
              {field.state.meta.errors ? (
                <p className="text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        />
      </div>

      <div>
        <form.Field
          name="password"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Password</label>
              <input
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border p-2 w-full"
              />
              {field.state.meta.errors ? (
                <p className="text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        />
      </div>
      <button
        type="submit"
        disabled={form.state.isSubmitting}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {form.state.isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};
export default SignUpForm;
