"use client";

import { AccountSettingHookDto } from "@/app/hooks/pages/profile/useAccountSettings";
import ThemeToggleComponent from "./themeToggleComponent";
import ProfileSettingsComponent from "./profileSettingsComponent";

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
