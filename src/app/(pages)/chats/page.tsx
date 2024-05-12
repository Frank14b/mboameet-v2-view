"use client";

import { ChatsComponent } from "@/app/components/layout/chats/chatsComponent";
import useChat from "@/app/hooks/pages/chats/useChat";
import { Card, Typography } from "@material-tailwind/react";

export default function ChatsPage() {
  //
  const chatHook = useChat();

  return (
    <>
      <Card placeholder={""} className={`w-full pt-3 h-screen dark:bg-gray-800`}>
        <div className="w-full flex absolute dark:text-white right-0 px-5">
          <div className="w-1/2 px-5">
            <Typography placeholder={""} className="font-bold px-1">
              Discussions
            </Typography>
          </div>
        </div>
        {/*  */}
        <div className="mt-12">
          <ChatsComponent chatHook={chatHook} />
        </div>
        {/*  */}
      </Card>
    </>
  );
}
