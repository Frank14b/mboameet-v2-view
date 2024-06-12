"use client";

import { ConversationsComponent } from "@/app/components/layout/chats/ConversationsComponent";
import useDiscussions from "@/app/hooks/pages/chats/useDiscussions";
import { chatBgImageClassName } from "@/app/lib/constants/app";
import { Card, Typography } from "@material-tailwind/react";

export default function ConversationPage({
  params,
}: {
  params: { reference: string };
}) {
  //
  const conversationHook = useDiscussions({ reference: params.reference });

  return (
    <>
      <Card
        placeholder={""}
        className={`w-full p-0 dark:bg-gray-800 ${chatBgImageClassName.lightMode} ${chatBgImageClassName.darkMode}`}
      >
        {/*  */}
        <div className="mt-0">
          <ConversationsComponent conversationHook={conversationHook} />
        </div>
        {/*  */}
      </Card>
    </>
  );
}
