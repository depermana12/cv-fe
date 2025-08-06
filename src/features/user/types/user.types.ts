import { z } from "zod";
import {
  userSchema,
  userStats,
  userInsertSchema,
  userUpdateSchema,
  userCredentialsUpdateSchema,
  userPreferencesUpdateSchema,
  checkUsernameSchema,
} from "../schema/user";

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userInsertSchema>;

export type UserStats = z.infer<typeof userStats>;

export type UserUpdateProfile = z.infer<typeof userUpdateSchema>;
export type UserCredentialsUpdate = z.infer<typeof userCredentialsUpdateSchema>;
export type UserPreferencesUpdate = z.infer<typeof userPreferencesUpdateSchema>;

export type CheckUsername = z.infer<typeof checkUsernameSchema>;

export type UserProfileProgressRes = {
  totalFields: number;
  filledFields: number;
  progressPercentage: number;
  emptyFieldNames: string[];
};
