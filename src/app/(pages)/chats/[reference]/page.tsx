"use client";

import { ConversationsComponent } from "@/app/components/layout/chats/conversationsComponent";
import useDiscussions from "@/app/hooks/pages/chats/useDiscussions";
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
        className={`w-full pt-1 dark:bg-gray-800`}
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
