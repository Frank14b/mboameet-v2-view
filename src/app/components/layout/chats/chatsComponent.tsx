"use client";

import {
  TabCustomAnimationProps,
  TabsCustomAnimation,
} from "../../widgets/tabsCustomAnimation";
import { useCallback, useMemo, useState } from "react";
import { ResultFriendsDto } from "@/app/types/friends";
import { UserProfileCardSkeleton } from "../../widgets/skeletons/userProfileCardSkeleton";
import { UserProfilePopup } from "../../widgets/userProfilePopup";
import { NoDataFound } from "../../widgets/noDataFound";
import { ChatHookDto } from "@/app/hooks/pages/chats/useChat";
import { DiscussionTypes, ResultMessageDto } from "@/app/types/chats";
import ListWithAvatar, {
  ListWithAvatarProps,
} from "../../widgets/listWithAvatar";
import { MessagesComponent } from "./messagesComponent";
import AnimateSlideInLeft from "../../widgets/motions/animateSlideInLeft";

export function ChatsComponent({ chatHook }: { chatHook: ChatHookDto }) {
  //
  const skeletons: number = 2;
  const {
    isLoading,
    discussions,
    discussionTypesList,
    openChat,
    messages,
    users,
    setUsers,
    fetchMessages,
    setOpenChat,
    setIsLoading,
    fetchDiscussions,
  } = chatHook;
  //
  const defaultTab: DiscussionTypes = discussionTypesList[0]
    .key as DiscussionTypes;
  const [activeTab, setActiveTab] = useState<DiscussionTypes>(defaultTab);
  const [showUserDetails, setShowUserDetails] = useState<{
    status: boolean;
    friend?: ResultFriendsDto;
  }>({ status: false });
  const [activeChat, setActiveChat] = useState<ListWithAvatarProps | null>(
    null
  );

  const onTabChange = (tab: string) => {
    setIsLoading(true);
    setActiveTab(tab as DiscussionTypes);
    fetchDiscussions({
      type: tab as DiscussionTypes,
    });
  };

  const onActionClick = useCallback(
    (data: ListWithAvatarProps) => {
      setOpenChat(!openChat);

      if (!openChat) {
        fetchMessages({
          type: activeTab as DiscussionTypes,
          userId: data.id,
        });

        setUsers((prevValues) => {
          return {
            ...prevValues,
            secondUser: {
              id: data.id,
              name: data.title,
              avatar: data.image,
            },
          };
        });
      }

      setActiveChat(!openChat ? data : null);
    },
    [openChat, activeTab, setUsers, setOpenChat, setActiveChat, fetchMessages]
  );

  const onMessageActionClick = useCallback(
    (data: ResultMessageDto, action: string) => {},
    []
  );

  const discussionsList = useMemo(() => {
    if (isLoading)
      return <UserProfileCardSkeleton isLoading={true} count={skeletons} />;
    //
    if (discussions.length == 0)
      return (
        <NoDataFound customClass="shadow-none dark:bg-gray-800" message="" />
      );

    return (
      <div className={`${openChat ? "grid grid-cols-10" : ""}`}>
        <div className="">
          <ListWithAvatar
            activeItem={activeChat?.id}
            onActionClick={onActionClick}
            data={discussions}
          />
        </div>

        {openChat && (
          <div className="col-span-9">
            <AnimateSlideInLeft speed={0.3}>
              <MessagesComponent
                users={users}
                messages={messages}
                onActionClick={onMessageActionClick}
              />
            </AnimateSlideInLeft>
          </div>
        )}
      </div>
    );
  }, [
    discussions,
    messages,
    users,
    isLoading,
    openChat,
    activeChat,
    onActionClick,
    onMessageActionClick,
  ]);

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
      {showUserDetails.friend && (
        <UserProfilePopup
          show={showUserDetails.status}
          onClose={() =>
            setShowUserDetails((prevData) => {
              return {
                ...prevData,
                status: false,
              };
            })
          }
          user={showUserDetails.friend as ResultFriendsDto}
        />
      )}

      <TabsCustomAnimation
        defaultTab={defaultTab}
        onTabChange={onTabChange}
        tabData={tabMenus}
      />
    </div>
  );
}
