"use client";

import { useCallback, useMemo } from "react";
import { NoDataFound } from "../../widgets/noDataFound";
import { ConversationHookDto } from "@/app/hooks/pages/chats/useDiscussions";
import { ResultMessageDto } from "@/app/types/chats";
import { MessagesComponent } from "./messagesComponent";
import DiscussionSkeleton from "../../widgets/skeletons/discussionSkeleton";

export function ConversationsComponent({
  conversationHook,
}: {
  conversationHook: ConversationHookDto;
}) {
  //
  const skeletons: number = 5;
  const { isLoading, messages, users, setIsLoading } = conversationHook;
  //

  const onMessageActionClick = useCallback(
    (data: ResultMessageDto, action: string) => {},
    []
  );

  const messagesList = useMemo(() => {
    if (isLoading)
      return <DiscussionSkeleton isLoading={true} count={skeletons} />;
    //
    if (messages.length == 0)
      return (
        <NoDataFound customClass="shadow-none dark:bg-gray-800" message="" />
      );

    return (
      <div className={`w-full`}>
        <MessagesComponent
          users={users}
          messages={messages}
          onActionClick={onMessageActionClick}
          conversationHook={conversationHook}
        />
      </div>
    );
  }, [messages, users, isLoading, conversationHook, onMessageActionClick]);

  return (
    <div className="w-full">
      {/* // */} {messagesList}{" "}
    </div>
  );
}
