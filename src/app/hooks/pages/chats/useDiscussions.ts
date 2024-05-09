import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { notification } from "@/app/lib/notifications";
import { useMainContext } from "@/app/contexts/main";
import { ResultMessageDto } from "@/app/types/chats";
import { getMessages, sendMessage } from "@/app/services/server-actions/chats";
import { messageFieldId } from "@/app/lib/constants/app";
import {
  MessageProps,
  UserProps,
} from "@/app/components/layout/chats/messagesComponent";
import useUserStore from "@/app/store/userStore";
import { debounce, getContentEditable } from "@/app/lib/utils";
import useChatStore from "@/app/store/chatStore";
import { useRouter } from "next/navigation";
import { useAppHubContext } from "@/app/contexts/appHub";

const useDiscussions = ({ reference }: { reference: string }) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<ResultMessageDto[] | []>([]);
  const { getFileUrl } = useMainContext();
  const { user } = useUserStore();
  const [users, setUsers] = useState({
    primaryUser: {
      id: user?.id,
      name: user?.userName,
      avatar: user?.photo,
    },
    secondUser: {
      id: 0,
      name: "",
      avatar: "",
    },
  });
  const { createdMessage, setCreatedMessage, setOpenDiscussion } =
    useChatStore();
  const router = useRouter();
  const { chatHubs } = useAppHubContext();
  const [lastMessageId, setLastMessageId] = useState<number>(0);
  

  const fetchMessages = useCallback(
    async (cursor = 0) => {
      //
      const result = await getMessages({
        revalidate: true,
        reference,
        cursor: cursor,
      });

      if (!result.status) {
        if (cursor > 0) return;
        return router.push("/chats");
      }

      setIsLoading(false);
      if (result.status && result?.data?.messages) {
        //
        const userId = result.data.userId;
        const userName = result.data.userName;
        const photo = result.data.photo;
        const resultMessages = result.data.messages.data;

        const lastMessage = resultMessages[resultMessages.length - 1];
        if (lastMessage) {
          setLastMessageId(lastMessage.id);
        }

        setUsers((prevValues) => {
          return {
            ...prevValues,
            secondUser: {
              id: userId,
              name: userName,
              avatar: getFileUrl(photo, userId),
            },
          };
        });

        chatHubs?.updateUserMessagesAsRead(userId);

        if (cursor > 0) {
          setMessages((prevValues) => {
            return [...prevValues, ...resultMessages];
          });
        } else {
          setMessages(resultMessages);
        }

        return resultMessages;
      }

      setMessages([]);
    },
    [
      reference,
      chatHubs,
      router,
      setLastMessageId,
      setIsLoading,
      getFileUrl,
      setMessages,
    ]
  );

  useEffect(() => {
    setOpenDiscussion(true);

    if (messages.length === 0) {
      fetchMessages();
      return;
    }
  }, [messages, fetchMessages]);

  useEffect(() => {
    if (createdMessage) {
      if (lastMessageId !== createdMessage.id) {
        setCreatedMessage(null);
        debounce(fetchMessages, 2000, lastMessageId);
        return;
      }
    }
  }, [createdMessage, lastMessageId, setCreatedMessage, fetchMessages]);

  const isMessageTimeMoreThanSixtySeconds = (
    newMessageTime: string,
    prevMessageTime: string | null
  ) => {
    if (prevMessageTime === null) return true;

    const difference =
      new Date(`${newMessageTime}`).getTime() -
      new Date(prevMessageTime).getTime();

    if (difference / 1000 > 60) {
      return true;
    }

    return false;
  };

  const formattedMessages = useMemo(() => {
    //
    let previousMessageUserId = 0;
    let previousMessageTime: string | null = null;
    const result: MessageProps[] = [];

    messages.map((message, index) => {
      const isSameUserAsPrevious = previousMessageUserId === message.sender;

      const isTimeMoreThanSixtySeconds = isMessageTimeMoreThanSixtySeconds(
        `${message.createdAt}`,
        previousMessageTime
      );

      previousMessageUserId = message.sender;
      previousMessageTime = `${message.createdAt}`;

      const resultSize = result.length;

      if (isSameUserAsPrevious && !isTimeMoreThanSixtySeconds) {
        const isLastSameUserAsPrevious =
          messages?.[index + 1]?.sender !== previousMessageUserId;

        result[resultSize - 1].messageGroup.push({
          id: message.id,
          message: message.message,
          isLastMessage: isLastSameUserAsPrevious,
        });
        result[resultSize - 1].isRead = message.isRead;
      } else {
        result.push({
          id: message.id,
          message: message.message,
          type: message.messageType,
          date: new Date(`${message.createdAt}`).toDateString(),
          sender: message.sender,
          receiver: message.receiver,
          isSameUserAsPrevious: isSameUserAsPrevious,
          messageGroup: [],
          isRead: message.isRead,
        });
      }
    });

    return result;
  }, [messages]);

  const handleSendMessage = useCallback(
    async ({ userId }: { userId: number }) => {
      const inputText = getContentEditable(`${messageFieldId}`);
      const message = inputText.innerText;

      if (message.length > 0) {
        await sendMessage({
          revalidate: true,
          type: "users",
          userId,
          message,
        });

        inputText.innerText = "";
      }
    },
    []
  );

  const data: ConversationHookDto = {
    isLoading,
    messages: formattedMessages,
    users,
    setUsers,
    setIsLoading,
    fetchMessages,
    handleSendMessage,
  };

  return { ...data };
};

export default useDiscussions;

export type ConversationHookDto = {
  isLoading: boolean;
  messages: MessageProps[] | [];
  users: {
    primaryUser: UserProps;
    secondUser: UserProps;
  };
  setUsers: Dispatch<
    SetStateAction<{
      primaryUser: UserProps;
      secondUser: UserProps;
    }>
  >;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchMessages: () => Promise<ResultMessageDto[] | void | undefined>;
  handleSendMessage: ({ userId }: { userId: number }) => void;
};
