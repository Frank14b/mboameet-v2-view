"use client";

import { ChatsComponent } from "@/app/components/layout/chats/ChatsComponent";
import useChat from "@/app/hooks/pages/chats/useChat";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";

export default function ChatPage() {
  //
  const chatHook = useChat();

  return (
    <>
      <Card
        placeholder={""}
        className={`w-full pt-3 h-screen dark:bg-gray-800`}
      >
        <div className="flex dark:text-white pl-4">
          <div className="w-1/2 px-0">
            <Typography placeholder={""} className="font-bold px-1 flex gap-2">
              <ChatBubbleLeftEllipsisIcon className="h-4 w-4 mt-[5px]" />
              Discussions
            </Typography>
          </div>
        </div>
        {/*  */}
        <div className="mt-5">
          <ChatsComponent chatHook={chatHook} />
        </div>
        {/*  */}
      </Card>
    </>
  );
}
