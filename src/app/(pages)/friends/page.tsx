"use client";

import { FriendsComponent } from "@/app/components/layout/friends/FriendsComponent";
import useFriends from "@/app/hooks/pages/friends/useFriends";
import { UsersIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export default function FriendsPage() {
  //
  const friendsHook = useFriends();

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-4">
        <div className="w-1/2 px-0">
          <Typography placeholder={""} className="font-bold px-1 flex gap-2">
            <UsersIcon className="h-4 w-4 mt-[4px]" />
            Friends
          </Typography>
        </div>
      </div>
      {/*  */}
      <div className="mt-12">
        <FriendsComponent friendsHook={friendsHook} />
      </div>
      {/*  */}
    </>
  );
}
