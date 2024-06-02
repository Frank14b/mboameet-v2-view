"use client";

import { Button, Typography } from "@material-tailwind/react";
import UserStoriesCard from "../widgets/userStoriesCard";
import SideBarMenuListUserComponent from "../widgets/sidebar/menuListUser";
import { PlusIcon } from "@heroicons/react/24/solid";
import useFriends from "@/app/hooks/pages/friends/useFriends";
import { useMemo } from "react";
import CustomNextLink from "../widgets/customNextLink";
import { friendPathUrl } from "@/app/lib/constants/app";

export default function AsideBarMenuComponent({ children }: { children: any }) {
  //
  const { friends, isLoading } = useFriends();

  const friendSuggestions = useMemo(() => {
    if (isLoading) return <>Loading...</>;
    if (friends.length == 0) return <>No friends found</>;

    return (
      <>
        <div className="max-h-[300px] overflow-y-auto">
          <SideBarMenuListUserComponent
            users={friends.map((friend: any, index: number) => {
              return {
                id: friend._id,
                title: `${friend.firstName} ${friend.lastName}`,
                image: friend.photo,
              };
            })}
          />
        </div>
        <p className="text-xs underline px-1 pt-5">
          <CustomNextLink href={friendPathUrl}> See All </CustomNextLink>
        </p>
      </>
    );
  }, [friends, isLoading]);

  return (
    <>
      {children}
      <div className="w-full pb-6 dark:text-gray-200">
        <div className="relative">
          <Typography placeholder={""} className="font-bold px-1 pb-1 gap-3">
            Stories{" "}
            <Button placeholder={""} size="sm" className="bg-pink-600 mx-3 p-1">
              <PlusIcon className="w-4 h-4 cursor-pointer" />
            </Button>
          </Typography>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../communication-social-media-icons-smartphone-device.jpg"
              />
            </div>
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../beautiful-rendering-dating-app-concept.jpg"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../beautiful-rendering-dating-app-concept.jpg"
              />
            </div>
            <div className="p-1">
              <UserStoriesCard
                title=""
                description=""
                image="../full-shot-people-use-apps-make-friends.jpg"
                bgImage="../bgac72c497338f11a05d3d.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-6 dark:text-gray-200">
        <Typography placeholder={""} className="font-bold px-1">
          Suggestions
        </Typography>

        <div className="w-full">{friendSuggestions}</div>
      </div>
    </>
  );
}
