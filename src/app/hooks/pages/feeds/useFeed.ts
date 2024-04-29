import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ApiResponseDto,
  BooleanResultDto,
  FeedFilesData,
  FeedTypes,
  ResultFeed,
  ResultPaginate,
} from "../../../types";
import {
  getFeeds,
  proceedDeleteFeed,
  proceedDesLikeFeed,
  proceedLikeFeed,
} from "../../../services/server-actions";
import useFeedStore from "@/app/store/feedStore";
import { getContentEditable } from "@/app/lib/utils";
import useUserStore from "@/app/store/userStore";
import { referenceKeyword } from "@/app/lib/constants/app";
import { notification } from "@/app/lib/notifications";

export function useFeed(): FeedHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<ResultFeed[] | null>(null);
  const { feed, updatedFeed, deletedFeedId, setFeed } = useFeedStore();
  const { user } = useUserStore();
  //
  const fetchFeeds = useCallback(
    async ({ type }: { type: FeedTypes }) => {
      if(type != 'recent') return [];

      const result: ApiResponseDto<ResultPaginate<ResultFeed[]>> =
        await getFeeds({
          revalidate: true,
        });

      setIsLoading(false);
      if (result.status && result?.data?.data) {
        setFeeds(result.data.data);
        return result.data.data;
      }

      return [];
    },
    [setIsLoading, setFeeds]
  );

  useEffect(() => {
    fetchFeeds({ type: "recent" });
  }, [fetchFeeds]);

  const formattedFeeds = useMemo(() => {
    const data = feeds as ResultFeed[];

    if (
      feed != null && data &&
      data?.findIndex((f: ResultFeed) => f.id === feed.id) == -1
    ) {
      data.unshift(feed);

      setTimeout(() => {
        setFeeds(data);
        setFeed(null);
      }, 1);
    }

    return data;
  }, [feeds, feed, setFeed]);

  useEffect(() => {
    if (deletedFeedId != null) {
      getContentEditable(`${referenceKeyword}-${deletedFeedId}`)?.remove();
    }
  }, [deletedFeedId]);

  const deleteItemAsync = useCallback(
    async ({ itemId, itemRef }: { itemId: number; itemRef: string }) => {
      const result = await proceedDeleteFeed(itemId);

      notification.apiNotify<BooleanResultDto<null>>(result);

      if (result.status) {
        document.getElementById(itemRef)?.remove();
      }
    },
    []
  );

  const getFileType = useCallback((files: FeedFilesData[]) => {
    if (files.length > 2) return "carousel";
    if (files.length == 1) {
      if (files[0].url.includes(".mp4")) return "video";
      return "image";
    }
    return "images";
  }, []);

  const likeFeed = async ({ id }: { id: number }) => {
    await proceedLikeFeed(id);
  };

  const desLikeFeed = async ({ id }: { id: number }) => {
    await proceedDesLikeFeed(id);
  };

  const canEditFeed = useCallback(
    (feed: ResultFeed) => {
      if (feed.user.id == user?.id) return true;
      return false;
    },
    [user]
  );

  const data: FeedHookDto = {
    isLoading,
    feeds: formattedFeeds,
    updatedFeed: updatedFeed,
    setIsLoading,
    deleteItemAsync,
    fetchFeeds,
    setFeeds,
    getFileType,
    likeFeed,
    desLikeFeed,
    canEditFeed,
  };

  return { ...data };
}

export default useFeed;

export interface FeedHookDto {
  isLoading: boolean;
  feeds: ResultFeed[] | null;
  updatedFeed: ResultFeed | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  deleteItemAsync: ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => Promise<void>;
  fetchFeeds: ({ type }: { type: FeedTypes }) => Promise<ResultFeed[] | []>;
  setFeeds: Dispatch<SetStateAction<ResultFeed[] | null>>;
  getFileType: (
    files: FeedFilesData[]
  ) => "carousel" | "video" | "image" | "images";
  likeFeed: ({ id }: { id: number }) => Promise<void>;
  desLikeFeed: ({ id }: { id: number }) => Promise<void>;
  canEditFeed: (feed: ResultFeed) => boolean;
}
