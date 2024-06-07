"use client";

import { AccountSettingHookDto } from "@/app/hooks/pages/profile/useAccountSettings";
import ThemeToggleComponent from "./ThemeToggleComponent";
import ProfileSettingsComponent from "./ProfileSettingsComponent";

export default function SettingsComponent({
  settingsHook,
}: {
  settingsHook: AccountSettingHookDto;
}) {
  const { isLoading } = settingsHook;
  return (
    <>
      {/*  */}

      <ThemeToggleComponent />

      {!isLoading && (
        <>
          <ProfileSettingsComponent settingsHook={settingsHook} />
        </>
      )}

      {/*  */}
    </>
  );
}
