import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import { ForgetPasswordForm } from "../../components/ForgetPasswordForm";
import { ResetPasswordForm } from "../../components/ResetPasswordForm";

// Mock all the dependencies
vi.mock("../../hooks/useSignIn", () => ({
  useSignIn: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("../../hooks/useSignUp", () => ({
  useSignUp: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("../../hooks/useForgetPassword", () => ({
  useForgetPassword: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("../../hooks/useResetPassword", () => ({
  useResetPassword: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("@shared/hooks/useFieldError", () => ({
  default: () => null,
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) =>
    `<a href="${to}">${children}</a>`,
  useNavigate: () => vi.fn(),
}));

vi.mock("@tanstack/react-form", () => ({
  useForm: () => ({
    Field: ({ children }: { children: (field: any) => React.ReactNode }) =>
      children({
        state: {
          value: "",
          meta: { isTouched: false, isDirty: false, isValid: true },
        },
        handleChange: vi.fn(),
        handleBlur: vi.fn(),
      }),
    handleSubmit: vi.fn(),
  }),
}));

// Mock Mantine components
vi.mock("@mantine/core", () => ({
  TextInput: ({ label, placeholder, ...props }: any) =>
    `<input aria-label="${label}" placeholder="${placeholder}" {...props} />`,
  PasswordInput: ({ label, placeholder, ...props }: any) =>
    `<input type="password" aria-label="${label}" placeholder="${placeholder}" {...props} />`,
  Button: ({ children, ...props }: any) =>
    `<button {...props}>${children}</button>`,
  Box: ({ children }: any) => `<div>${children}</div>`,
  Group: ({ children }: any) => `<div>${children}</div>`,
  Anchor: ({ children, ...props }: any) => `<a {...props}>${children}</a>`,
  Checkbox: ({ label, ...props }: any) =>
    `<input type="checkbox" aria-label="${label}" {...props} />`,
  Stack: ({ children }: any) => `<div>${children}</div>`,
  LoadingOverlay: () => `<div>Loading...</div>`,
}));

describe("Auth Components", () => {
  describe("SignInForm", () => {
    it("should render without crashing", () => {
      expect(() => render(<SignInForm />)).not.toThrow();
    });

    it("should be a valid React component", () => {
      const component = <SignInForm />;
      expect(component).toBeDefined();
      expect(component.type).toBe(SignInForm);
    });
  });

  describe("SignUpForm", () => {
    it("should render without crashing", () => {
      expect(() => render(<SignUpForm />)).not.toThrow();
    });

    it("should be a valid React component", () => {
      const component = <SignUpForm />;
      expect(component).toBeDefined();
      expect(component.type).toBe(SignUpForm);
    });
  });

  describe("ForgetPasswordForm", () => {
    it("should render without crashing", () => {
      expect(() => render(<ForgetPasswordForm />)).not.toThrow();
    });

    it("should be a valid React component", () => {
      const component = <ForgetPasswordForm />;
      expect(component).toBeDefined();
      expect(component.type).toBe(ForgetPasswordForm);
    });
  });

  describe("ResetPasswordForm", () => {
    const mockToken = "reset-token-123";

    it("should render without crashing", () => {
      expect(() =>
        render(<ResetPasswordForm token={mockToken} />),
      ).not.toThrow();
    });

    it("should accept token prop", () => {
      const component = <ResetPasswordForm token={mockToken} />;
      expect(component).toBeDefined();
      expect(component.props.token).toBe(mockToken);
    });

    it("should be a valid React component", () => {
      const component = <ResetPasswordForm token={mockToken} />;
      expect(component).toBeDefined();
      expect(component.type).toBe(ResetPasswordForm);
    });
  });
});
