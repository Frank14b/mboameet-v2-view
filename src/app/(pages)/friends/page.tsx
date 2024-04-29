"use client";

import { FriendsComponent } from "@/app/components/layout/friends/friendsComponent";
import useFriends from "@/app/hooks/pages/friends/useFriends";
import { Typography } from "@material-tailwind/react";

export default function FriendsPage() {
  //
  const friendsHook = useFriends();

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2 px-5">
          <Typography placeholder={""} className="font-bold px-1">
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
