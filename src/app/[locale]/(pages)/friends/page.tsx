"use client";

import { FriendsComponent } from "@/app/components/layout/friends/FriendsComponent";
import useFriends from "@/app/hooks/pages/friends/useFriends";
import { useScopedI18n } from "@/app/locales/client";
import { UsersIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export default function FriendsPage() {
  //
  const friendsHook = useFriends();
  const { activeTab, handleScrollEvent } = friendsHook;

  const scopedT = useScopedI18n("friends");

  return (
    <>
      <div className="flex dark:text-white pl-4">
        <div className="w-1/2 px-0">
          <Typography placeholder={""} className="font-bold px-1 flex gap-2">
            <UsersIcon className="h-4 w-4 mt-[4px]" />
            {scopedT("title")}
          </Typography>
        </div>
      </div>
      {/*  */}
      <div
        className="mt-5 h-[100vh] overflow-y-auto rounded-lg"
        id={`friendsScroll-${activeTab}`}
        onScroll={(e) => handleScrollEvent(e.currentTarget)}
      >
        <FriendsComponent friendsHook={friendsHook} />
      </div>
      {/*  */}
    </>
  );
}
