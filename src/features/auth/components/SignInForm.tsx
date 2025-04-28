import { useForm } from "@tanstack/react-form";
import { signInSchema, type SignIn } from "../types/auth.schema";
import { useSignIn } from "../hooks/useSignIn";

const SignInForm = () => {
  const { mutate } = useSignIn();

  const defaultSignInForm: SignIn = { email: "", password: "" };
  const form = useForm({
    defaultValues: defaultSignInForm,
    onSubmit: async ({ value }) => {
      console.log("user login", value);
      mutate(value);
    },
    validators: {
      onChange: signInSchema,
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
              {field.state.meta.errors.length ? (
                <p className="text-red-500">
                  {field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
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
              {field.state.meta.errors.length ? (
                <p className="text-red-500">
                  {field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                </p>
              ) : null}
            </>
          )}
        />
      </div>
      <button
        type="submit"
        disabled={form.state.isSubmitting}
        className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600"
      >
        {form.state.isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};
export default SignInForm;
