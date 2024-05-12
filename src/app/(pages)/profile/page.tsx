"use client";

import ProfileAccountComponent from "@/app/components/layout/profile/profileComponent";
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
