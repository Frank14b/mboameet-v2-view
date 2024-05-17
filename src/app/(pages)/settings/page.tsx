"use client";

import SettingsComponent from "@/app/components/layout/settings/settingsComponent";
import useAccountSettings from "@/app/hooks/pages/profile/useAccountSettings";
import { Typography } from "@material-tailwind/react";

export default function SettingPage() {
  const settingsHook = useAccountSettings();

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

      <SettingsComponent settingsHook={settingsHook} />

      {/*  */}
    </>
  );
}
