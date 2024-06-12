"use client";

import WalletsComponent from "@/app/components/layout/wallets/WalletsComponent";
import { Typography } from "@material-tailwind/react";

export default function WalletsPage() {
  //
  return (
    <>
      <div className="flex dark:text-white pl-4">
        <div className="w-1/2">
          <Typography placeholder={""} className="font-bold px-1">
            My Wallets
          </Typography>
        </div>
      </div>

      <WalletsComponent />
    </>
  );
}
