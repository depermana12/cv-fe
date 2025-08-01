import { describe, it, expect } from "vitest";
import {
  signInSchema,
  signUpSchema,
  forgetPasswordSchema,
  ResetPasswordSchema,
} from "../../schema/auth.schema";

describe("Auth Schema Validation", () => {
  describe("signInSchema", () => {
    it("should pass validation sign in", () => {
      const validData = {
        email: "example@email.com",
        password: "Password123!",
      };

      const result = signInSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid@email",
        password: "Password123!",
      };

      const result = signInSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("invalid email");
      }
    });

    it("should reject password less than 8 chars", () => {
      const invalidData = {
        email: "example@email.com",
        password: "Pass1!",
      };

      const result = signInSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "minimum 8 characters",
        );
      }
    });
  });

  describe("signUpSchema", () => {
    it("should pass validation sign up", () => {
      const validData = {
        username: "thebloop",
        email: "example@email.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      const result = signUpSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject username less than 3 chars", () => {
      const invalidData = {
        username: "tb",
        email: "example@email.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      const result = signUpSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "at least 3 characters",
        );
      }
    });

    it("should reject weak password without uppercase", () => {
      const invalidData = {
        username: "thebloop",
        email: "example@email.com",
        password: "password123!",
        confirmPassword: "password123!",
      };

      const result = signUpSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue: any) =>
            issue.message.includes("uppercase letter"),
          ),
        ).toBe(true);
      }
    });

    it("should reject weak password without special char", () => {
      const invalidData = {
        username: "thebloop",
        email: "example@email.com",
        password: "Password123",
        confirmPassword: "Password123",
      };

      const result = signUpSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue: any) =>
            issue.message.includes("special character"),
          ),
        ).toBe(true);
      }
    });

    it("should reject mismatched passwords", () => {
      const invalidData = {
        username: "thebloop",
        email: "example@email.com",
        password: "Password123!",
        confirmPassword: "DifferentPassword123!",
      };

      const result = signUpSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some(
            (issue: any) => issue.message === "Passwords do not match",
          ),
        ).toBe(true);
      }
    });

    it("should reject password longer than 128 characters", () => {
      const longPassword = "A".repeat(126) + "1@a";
      const invalidData = {
        username: "thebloop",
        email: "example@email.com",
        password: longPassword,
        confirmPassword: longPassword,
      };

      const result = signUpSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("forgetPasswordSchema", () => {
    it("should pass validationr reset", () => {
      const validData = {
        email: "example@email.com",
      };

      const result = forgetPasswordSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject invalid email format", () => {
      const invalidData = {
        email: "invalid@email",
      };

      const result = forgetPasswordSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("invalid email");
      }
    });
  });

  describe("ResetPasswordSchema", () => {
    it("should pass validation new password", () => {
      const validData = {
        password: "NewPassword123!",
        confirmPassword: "NewPassword123!",
      };

      const result = ResetPasswordSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject mismatched passwords", () => {
      const invalidData = {
        password: "NewPassword123!",
        confirmPassword: "DifferentPassword123!",
      };

      const result = ResetPasswordSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some(
            (issue: any) =>
              issue.message === "Confirm password is not the same as password",
          ),
        ).toBe(true);
      }
    });
  });
});
