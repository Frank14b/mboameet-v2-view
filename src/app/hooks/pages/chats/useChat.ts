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
import { DiscussionTypesDto } from "@/app/types";
import {
  DiscussionTypes,
  ResultChatUsersDto,
  ResultMessageDto,
} from "@/app/types/chats";
import {
  getDiscussions,
  getMessages,
} from "@/app/services/server-actions/chats";
import { defaultProfileImg, discussionTypes } from "@/app/lib/constants/app";
import { ListWithAvatarProps } from "@/app/components/widgets/listWithAvatar";
import {
  MessageProps,
  UserProps,
} from "@/app/components/layout/chats/messagesComponent";
import useUserStore from "@/app/store/userStore";

const useChat = () => {
  //
  const [discussionTypesList] = useState(Object.values(discussionTypes));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMsgLoading, setIsMsgLoading] = useState<boolean>(false);
  const [discussions, setDiscussions] = useState<ResultChatUsersDto[] | []>([]);
  const [messages, setMessages] = useState<ResultMessageDto[] | []>([]);
  const [openChat, setOpenChat] = useState<boolean>(false);
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

  const fetchDiscussions = useCallback(
    async ({ type }: { type: DiscussionTypes }) => {
      //
      const result = await getDiscussions({
        revalidate: true,
        type,
      });

      setIsLoading(false);
      if (result.status && result?.data?.data) {
        setDiscussions(result.data.data);
        return result.data.data;
      }

      setDiscussions([]);
    },
    [setIsLoading, setDiscussions]
  );

  useEffect(() => {
    fetchDiscussions({ type: discussionTypesList[0].key as DiscussionTypes });
  }, [fetchDiscussions, discussionTypesList]);

  const formattedDiscussions = useMemo(() => {
    return discussions.map((discussion) => {
      if (discussion.id == user?.id) {
        return {
          id: discussion.lastMessage.sender,
          title: discussion.senderUserName,
          subTitle: discussion.lastMessage.message,
          image: getFileUrl(discussion.senderPhoto, discussion.lastMessage.sender),
          chip: discussion.unReadCount > 0 ? discussion.unReadCount : undefined,
        };
      }

      return {
        id: discussion.id,
        title: discussion.userName,
        subTitle: discussion.lastMessage.message,
        image: getFileUrl(discussion.photo, discussion.id),
        chip: discussion.unReadCount > 0 ? discussion.unReadCount : undefined,
      };
    });
  }, [discussions, user, getFileUrl]);

  const fetchMessages = useCallback(
    async ({ type, userId }: { type: DiscussionTypes; userId: number }) => {
      //
      setIsMsgLoading(true);

      const result = await getMessages({
        revalidate: true,
        type,
        userId,
      });

      setIsMsgLoading(false);
      if (result.status && result?.data?.data) {
        setMessages(result.data.data);
        return result.data.data;
      }

      setMessages([]);
    },
    [setIsMsgLoading, setMessages]
  );

  const formattedMessages = useMemo(() => {
    return messages.map((message) => {
      return {
        id: message.id,
        message: message.message,
        type: message.messageType,
        date: new Date(`${message.createdAt}`).toDateString(),
        sender: message.sender,
        receiver: message.receiver,
      };
    });
  }, [messages]);

  const data: ChatHookDto = {
    isLoading,
    isMsgLoading,
    discussions: formattedDiscussions,
    messages: formattedMessages,
    discussionTypesList,
    openChat,
    users,
    setUsers,
    setOpenChat,
    setIsLoading,
    fetchDiscussions,
    fetchMessages,
  };

  return { ...data };
};

export default useChat;

export type ChatHookDto = {
  isLoading: boolean;
  isMsgLoading: boolean;
  discussions: ListWithAvatarProps[] | [];
  messages: MessageProps[] | [];
  discussionTypesList: DiscussionTypesDto[];
  openChat: boolean;
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
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchDiscussions: ({
    type,
  }: {
    type: DiscussionTypes;
  }) => Promise<ResultChatUsersDto[] | undefined>;
  fetchMessages: ({
    type,
    userId,
  }: {
    type: DiscussionTypes;
    userId: number;
  }) => Promise<ResultMessageDto[] | undefined>;
};
