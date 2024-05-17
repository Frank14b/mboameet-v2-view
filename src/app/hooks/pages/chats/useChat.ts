import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMainContext } from "@/app/contexts/main";
import { DiscussionTypesDto } from "@/app/types";
import { DiscussionTypes, ResultChatUsersDto } from "@/app/types/chats";
import { getDiscussions } from "@/app/services/server-actions/chats";
import { discussionTypes } from "@/app/lib/constants/app";
import { ListWithAvatarProps } from "@/app/components/widgets/listWithAvatar";
import useUserStore from "@/app/store/userStore";

const useChat = () => {
  //
  const [discussionTypesList] = useState(Object.values(discussionTypes));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [discussions, setDiscussions] = useState<ResultChatUsersDto[] | []>([]);
  const [activeTab, setActiveTab] = useState<DiscussionTypes>(
    discussionTypesList[0].key as DiscussionTypes
  );
  const { appEncryption, getFileUrl } = useMainContext();
  const { user } = useUserStore();
  const { decryptAndDecodeMessageAsync } = appEncryption;

  const fetchDiscussions = useCallback(
    async ({ type }: { type: DiscussionTypes }) => {
      //
      const result = await getDiscussions({
        revalidate: true,
        type,
      });

      if (!result.status || !result?.data?.data) {
        setIsLoading(false);
        setDiscussions([]);
        return;
      }

      if (
        result.data.data.findIndex(
          (discussion) => discussion.lastMessage.isEncrypted
        ) !== -1
      ) {
        for (let discussion of result.data.data) {
          const message = discussion.lastMessage;
          if (message.isEncrypted) {
            discussion.lastMessage.message = await decryptAndDecodeMessageAsync(
              message.message
            );
          }
        }
      }

      setDiscussions(result.data.data);
      setIsLoading(false);
      return result.data.data;
    },
    [setIsLoading, setDiscussions, decryptAndDecodeMessageAsync]
  );

  useEffect(() => {
    fetchDiscussions({ type: discussionTypesList[0].key as DiscussionTypes });
  }, [fetchDiscussions, discussionTypesList]);

  const formattedDiscussions = useMemo(() => {
    return discussions.map((discussion) => {
      return {
        id: discussion.id,
        title: discussion.userName,
        subTitle: discussion.lastMessage.message,
        image: getFileUrl(discussion.photo, discussion.id),
        chip: discussion.unReadCount > 0 ? discussion.unReadCount : undefined,
        reference: discussion.lastMessage.reference,
      };
    });
  }, [discussions, getFileUrl]);

  const data: ChatHookDto = {
    isLoading,
    discussions: formattedDiscussions,
    discussionTypesList,
    defaultTab: discussionTypesList[0].key as DiscussionTypes,
    activeTab,
    setActiveTab,
    setIsLoading,
    fetchDiscussions,
  };

  return { ...data };
};

export default useChat;

export type ChatHookDto = {
  isLoading: boolean;
  discussions: ListWithAvatarProps[] | [];
  discussionTypesList: DiscussionTypesDto[];
  defaultTab: DiscussionTypes;
  activeTab: DiscussionTypes;
  setActiveTab: Dispatch<SetStateAction<DiscussionTypes>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchDiscussions: ({
    type,
  }: {
    type: DiscussionTypes;
  }) => Promise<ResultChatUsersDto[] | undefined>;
};
