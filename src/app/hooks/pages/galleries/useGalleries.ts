import { notification } from "@/app/lib/notifications";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getGalleries } from "@/app/services/server-actions/users/galleries";
import { ChatFilesData } from "@/app/types/chats";
import { FeedFilesData } from "@/app/types";
import { useMainContext } from "@/app/contexts/main";
import { checkFileExtensionUsingLink } from "@/app/lib/utils";

const useGalleries = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedMedias, setFeedMedias] = useState<
    FeedFilesData[] | null | undefined
  >(null);
  const [chatMedias, setChatMedias] = useState<
    ChatFilesData[] | null | undefined
  >(null);
  const { connectedUser, getFileUrl } = useMainContext();

  const proceedGetMedias = useCallback(async () => {
    const result = await getGalleries();

    if (!result.status) {
      return notification.apiNotify(result);
    }

    setIsLoading(false);
    if (!result.data) {
      return;
    }

    setFeedMedias(result.data.feedFiles.data);
    setChatMedias(result.data.chatFiles.data);
  }, [setIsLoading]);

  const formattedFeedMedias = useMemo(() => {
    return feedMedias?.map((file) => {
      return {
        id: file.id,
        type: checkFileExtensionUsingLink(file.url) ?? file.type,
        previewUrl: file.previewUrl,
        url: getFileUrl(file.url, connectedUser?.id, connectedUser?.userName),
      };
    });
  }, [connectedUser, feedMedias, getFileUrl]);

  const formattedChatMedias = useMemo(() => {
    return chatMedias?.map((file) => {
      return {
        id: file.id,
        type: checkFileExtensionUsingLink(file.url) ?? file.type,
        previewUrl: file.previewUrl,
        url: getFileUrl(file.url, connectedUser?.id, connectedUser?.userName),
      };
    });
  }, [chatMedias, connectedUser, getFileUrl]);

  useEffect(() => {
    proceedGetMedias();
  }, [proceedGetMedias]);

  const data: GalleriesHookDto = {
    isLoading,
    setIsLoading,
    feedMedias: formattedFeedMedias,
    chatMedias: formattedChatMedias,
  };

  return { ...data };
};

export default useGalleries;

export type GalleriesHookDto = {
  isLoading: boolean;
  feedMedias: FeedFilesData[] | null | undefined;
  chatMedias: ChatFilesData[] | null | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
