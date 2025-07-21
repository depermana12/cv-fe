import { Suspense } from "react";
import { ProfileLoading } from "../components/ProfileLoading";
import { ProfileContent } from "../components/ProfileContent";

export const ProfilePage = () => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
};
