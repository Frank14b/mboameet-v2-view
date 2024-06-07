"use client";

import {
  TabCustomAnimationProps,
  TabsCustomAnimation,
} from "../../widgets/TabsCustomAnimation";
import { useCallback, useMemo } from "react";
import { NoDataFound } from "../../widgets/NoDataFound";
import { ChatHookDto } from "@/app/hooks/pages/chats/useChat";
import { DiscussionTypes, ResultMessageDto } from "@/app/types/chats";
import ListWithAvatar, {
  ListWithAvatarProps,
} from "../../widgets/ListWithAvatar";
import DiscussionSkeleton from "../../widgets/skeletons/DiscussionSkeleton";
import { chatsPathUrl } from "@/app/lib/constants/app";
import useCustomRouter from "@/app/hooks/useCustomRouter";

export function ChatsComponent({ chatHook }: { chatHook: ChatHookDto }) {
  //
  const skeletons: number = 5;
  const {
    isLoading,
    discussions,
    discussionTypesList,
    defaultTab,
    setActiveTab,
    setIsLoading,
    fetchDiscussions,
  } = chatHook;
  //
  const router = useCustomRouter();

  const onTabChange = (tab: string) => {
    setIsLoading(true);
    setActiveTab(tab as DiscussionTypes);
    fetchDiscussions({
      type: tab as DiscussionTypes,
    });
  };

  const onActionClick = useCallback(
    (data: ListWithAvatarProps) => {
      router.push(`${chatsPathUrl}/${data.reference}`);
    },
    [router]
  );

  const onMessageActionClick = useCallback(
    (data: ResultMessageDto, action: string) => {},
    []
  );

  const discussionsList = useMemo(() => {
    if (isLoading)
      return <DiscussionSkeleton isLoading={true} count={skeletons} />;
    //
    if (discussions.length == 0)
      return (
        <NoDataFound
          customClass="shadow-none dark:bg-gray-800"
          message=""
          showMessage={false}
        />
      );

    return (
      <div className={``}>
        <div className="overflow-y-auto h-custom-80 overflow-x-hidden">
          <ListWithAvatar
            activeItem={0}
            onActionClick={onActionClick}
            data={discussions}
          />
        </div>
      </div>
    );
  }, [discussions, isLoading, onActionClick]);

  const tabMenus = useMemo(() => {
    let result: TabCustomAnimationProps[] = [];

    discussionTypesList.map((tab) => {
      result.push({
        label: tab.name.toUpperCase(),
        value: tab.key,
        icon: tab.icon,
        htmlContent: discussionsList,
      });
    });

    return result;
  }, [discussionsList, discussionTypesList]);

  return (
    <div className="w-full">
      {/* // */}
      <TabsCustomAnimation
        defaultTab={defaultTab}
        onTabChange={onTabChange}
        tabData={tabMenus}
      />
    </div>
  );
}
