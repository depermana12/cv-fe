export type ProfilePictureProps = {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    username: string;
    profileImage?: string | null;
  };
};

export type AccountInformationProps = {
  user: {
    username: string;
    email: string;
    isEmailVerified?: boolean;
    createdAt: string | Date;
  };
};

export type ProfileFormProps = {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    birthDate?: Date | string | null;
    gender?: "male" | "female" | null;
  };
};
