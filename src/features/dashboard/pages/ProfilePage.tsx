import { Suspense } from "react";
import { ProfileContent } from "../profile/components/ProfileContent";
import { ProfileLoading } from "../profile/components/ProfileLoading";

export const ProfilePage = () => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}
