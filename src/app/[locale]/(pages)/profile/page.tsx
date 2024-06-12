"use client";

import ProfileAccountComponent from "@/app/components/layout/profile/ProfileComponent";
import useUserProfile from "@/app/hooks/pages/profile/useUserProfile";

export default function ProfilePage() {
  //
  const userProfileHook = useUserProfile();

  return (
    <>
      <ProfileAccountComponent userProfileHook={userProfileHook} />
    </>
  );
}
