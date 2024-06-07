"use client";

import { useCallback, useMemo } from "react";
import { NoDataFound } from "../../widgets/NoDataFound";
import { ConversationHookDto } from "@/app/hooks/pages/chats/useDiscussions";
import { ResultMessageDto } from "@/app/types/chats";
import { MessageComponent } from "./MessageComponent";
import ConversationSkeleton from "../../widgets/skeletons/ConversationSkeleton";

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
      return <ConversationSkeleton isLoading={true} count={skeletons} />;
    //
    if (messages.length == 0)
      return (
        <NoDataFound customClass="shadow-none dark:bg-gray-800" message="" showMessage={false} />
      );

    return (
      <div className={`w-full`}>
        <MessageComponent
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
