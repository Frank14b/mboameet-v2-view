"use client";

import AccountSettingsComponent from "@/app/components/layout/settings/accountSettingsComponent";
import ThemeToggleComponent from "@/app/components/layout/settings/themeToggleComponent";
import { Typography } from "@material-tailwind/react";

export default function SettingPage() {
  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2">
          <Typography placeholder={""} className="font-bold px-1">
            Settings
          </Typography>
        </div>
        <div className="w-1/2 text-xs flex justify-end pt-1">
          {/* <span className="mx-2 cursor-pointer font-bold">Network</span> */}
        </div>
      </div>
      {/*  */}

      <ThemeToggleComponent />

      <AccountSettingsComponent />

      <AccountSettingsComponent />

      {/*  */}
    </>
  );
}
