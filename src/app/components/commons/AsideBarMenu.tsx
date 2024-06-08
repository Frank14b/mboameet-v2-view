"use client";

import { Typography } from "@material-tailwind/react";
import UserStoriesCard from "../widgets/UserStoriesCard";
import SideBarMenuListUserComponent from "../widgets/sidebar/MenuListUser";
import useFriends from "@/app/hooks/pages/friends/useFriends";
import { useCallback, useMemo, useState } from "react";
import CustomNextLink from "../widgets/CustomNextLink";
import { friendPathUrl } from "@/app/lib/constants/app";
import { range } from "@/app/lib/utils";
import { StoriesPopupComponent } from "./stories/StoriesPopupComponent";

export default function AsideBarMenuComponent({ children }: { children: any }) {
  //
  const { friends, isLoading } = useFriends();
  const [activeStory, setActiveStory] = useState<number>(0);

  const onStoryClick = useCallback((id: number) => {
    setActiveStory(id)
  }, [setActiveStory])

  const friendSuggestions = useMemo(() => {
    if (isLoading)
      return <div className="mt-[5rem] text-center">Loading...</div>;
    if (friends.length == 0) return <>No friends found</>;

    return (
      <>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          <SideBarMenuListUserComponent
            users={friends.map((friend, index: number) => {
              let name = `${friend.firstName} ${friend.lastName}`;
              if (name.trim().length < 2) {
                name = `${friend.userName}`;
              }
              return {
                id: friend.id,
                title: `${name}`,
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

  const userStories = useMemo(() => {
    if (isLoading)
      return <div className="mt-[5rem] text-center">Loading...</div>;

    return (
      <>
        {range(1, 4).map((id, index) => (
          <div className="p-1" key={index}>
            <UserStoriesCard
              id={id}
              image="/full-shot-people-use-apps-make-friends.jpg"
              bgImage="../beautiful-rendering-dating-app-concept.jpg"
              activeStory={activeStory}
              onStoryClick={onStoryClick}
            />
          </div>
        ))}

        <p className="text-xs underline px-1 pt-5">
          <CustomNextLink href={friendPathUrl}> See All </CustomNextLink>
        </p>
      </>
    );
  }, [activeStory, isLoading, onStoryClick]);

  return (
    <>
      {children}
      <div className="w-full pb-6 dark:text-gray-200">
        <div className="relative">
          <StoriesPopupComponent />
        </div>

        <div className="grid grid-cols-2">{userStories}</div>
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
