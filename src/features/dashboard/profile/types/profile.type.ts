export type ProfilePictureProps = {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    username: string;
    bio?: string | null;
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
    gender?: "male" | "female" | undefined;
    about?: string | null;
    bio?: string | null;
  };
};
