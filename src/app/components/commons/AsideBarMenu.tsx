"use client";

import { Button, Typography } from "@material-tailwind/react";
import UserStoriesCard from "../widgets/UserStoriesCard";
import SideBarMenuListUserComponent from "../widgets/sidebar/MenuListUser";
import useFriends from "@/app/hooks/pages/friends/useFriends";
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomNextLink from "../widgets/CustomNextLink";
import { friendPathUrl } from "@/app/lib/constants/app";
import { StoriesPopupComponent } from "./stories/StoriesPopupComponent";
import useStories from "@/app/hooks/useStories";

export default function AsideBarMenuComponent({ children }: { children: any }) {
  //
  const { friends, isLoading } = useFriends();
  const { stories, handleGetStories } = useStories();
  const [activeStory, setActiveStory] = useState<number>(0);

  const onStoryClick = useCallback(
    (id: number) => {
      setActiveStory(id);
    },
    [setActiveStory]
  );

  useEffect(() => {
    handleGetStories({ limit: 4 });
  }, [handleGetStories]);

  const friendSuggestions = useMemo(() => {
    if (isLoading)
      return <div className="mt-[5rem] text-center">Loading...</div>;
    if (friends.length == 0) return <>No friends found</>;

    return (
      <>
        <div className="max-h-[260px] overflow-y-auto overflow-x-hidden">
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
        <StoriesPopupComponent />

        <div className="grid grid-cols-2">
          {stories.map((item, index) => (
            <div className="p-1" key={index}>
              <UserStoriesCard
                id={item.id}
                image="/images/full-shot-people-use-apps-make-friends.jpg"
                bgImage="../images/beautiful-rendering-dating-app-concept.jpg"
                item={item}
                nextItem={stories?.[index + 1]}
                activeStory={activeStory}
                onStoryClick={onStoryClick}
              />
            </div>
          ))}
        </div>

        <div className="w-full text-center mt-2">
          <Button
            onClick={() => {}}
            placeholder={""}
            size="sm"
            className="bg-gray-800 mx-auto w-[200px]"
          >
            View All Stories
          </Button>
        </div>
      </>
    );
  }, [activeStory, stories, isLoading, onStoryClick]);

  return (
    <>
      {children}
      <div className="w-full pb-6 dark:text-gray-200">
        <div className="px-0">{userStories}</div>
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
