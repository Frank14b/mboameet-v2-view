import React, { useCallback, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import useDiscussions from "@/app/hooks/pages/chats/useDiscussions";
import { ResultChatReferenceDto } from "@/app/types/chats";
import useCustomRouter from "@/app/hooks/useCustomRouter";

export function SayHiChatPopupComponent({
  id,
  name,
  children,
}: {
  id: number;
  name: string;
  children: React.ReactNode;
}) {
  const { checkExistingDiscussion, handleSendHiMessage } = useDiscussions({});

  const { push } = useCustomRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [chatReference, setChatReference] =
    React.useState<ResultChatReferenceDto | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getReference = useCallback(async () => {
    if (chatReference) return;
    const reference = await checkExistingDiscussion(id);
    setChatReference(reference);
  }, [id, chatReference, setChatReference, checkExistingDiscussion]);

  useEffect(() => {
    if (!open) return;
    getReference();
  }, [open, getReference]);

  const sendMessage = useCallback(async () => {
    if (chatReference) return;
    setIsLoading(true);
    const message = await handleSendHiMessage(id);

    if (message) {
      return push(`/chats/${message.reference}`);
    }
    setIsLoading(false);
  }, [id, chatReference, push, setIsLoading, handleSendHiMessage]);

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <Dialog placeholder={""} size="xs" open={open} handler={handleOpen}>
        <DialogBody
          placeholder={""}
          divider
          className="grid place-items-center gap-4 border-none"
        >
          <ChatBubbleLeftEllipsisIcon className="h-14 w-14 text-red-400" />
          <Typography placeholder={""} color="red" variant="h4">
            Say Hi!
          </Typography>
          <Typography placeholder={""} className="text-center font-normal">
            {!chatReference ? (
              <>
                Start a new conversation with <b className="capitalize">{name}</b>
              </>
            ) : (
              <>
                Continue your conversation with <b className="capitalize">{name}</b>
              </>
            )}
          </Typography>
        </DialogBody>
        <DialogFooter placeholder={""} className="space-x-2">
          {isLoading ? (
            <div className="w-full grid justify-center items-center h-14 py-2">
              <Spinner className="h-12 w-12" />
            </div>
          ) : (
            <>
              {" "}
              <Button
                placeholder={""}
                variant="text"
                color="blue-gray"
                onClick={handleOpen}
              >
                close
              </Button>
              {chatReference ? (
                <>
                  <Button
                    disabled={isLoading}
                    placeholder={""}
                    variant="gradient"
                    onClick={() => {
                      setIsLoading(true);
                      push(`/chats/${chatReference}`);
                    }}
                  >
                    Ok, Continue
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={isLoading}
                    placeholder={""}
                    variant="gradient"
                    onClick={sendMessage}
                  >
                    Ok, Say Hi!
                  </Button>
                </>
              )}
            </>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
