import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateFeedSchema } from "../../../validators";
import {
  ApiResponseDto,
  FeedCommentHookDto,
  ResultFeed,
  ResultPaginate,
} from "../../../types";
import {
  getFeedComments,
  getFeeds,
  proceedDeleteFeed,
  proceedDesLikeFeed,
  proceedLikeFeed,
  proceedSubmitDeleteFeedComment,
  proceedSubmitEditFeedComment,
  proceedSubmitFeedComment,
} from "../../../services/server-actions";

export function useFeedLikesHook(): FeedCommentHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateFeedSchema), // Integrate Yup for validation
  });
  //
  const [openFeedForm, handleOpenFeedForm] = useState<boolean>(false);
  const [openFeedFormImages, handleOpenFeedFormImages] =
    useState<boolean>(false);
  const [updateFeedItem, setUpdateFeedItem] = useState<ResultFeed | null>(null);
  // const [feeds, setFeeds] = useState<ResultFeed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openComment, setOpenComment] = useState<number>(0);
  const [editCommentId, setEditCommentId] = useState<number>(0);

  useEffect(() => {
    if (!openFeedForm) {
      setUpdateFeedItem(null);
    }
  }, [openFeedForm]);

  const fetchFeeds = async () => {
    const result: ApiResponseDto<ResultPaginate<ResultFeed[]>> = await getFeeds(
      {
        revalidate: true,
      }
    );

    setLoading(false);
    if (result.status && result?.data?.data) {
      return result.data.data;
    }

    return [];
  };

  const deleteItemAsync = async ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => {
    const result = await proceedDeleteFeed(itemId);
    if (result.status) {
      document.getElementById(itemRef)?.remove();
    }
  };

  const likeFeed = async ({ itemId }: { itemId: number }) => {
    await proceedLikeFeed(itemId);
  };

  const desLikeFeed = async ({ itemId }: { itemId: number }) => {
    await proceedDesLikeFeed(itemId);
  };

  const fetchComments = async ({ itemId }: { itemId: number }) => {
    const result = await getFeedComments(itemId);
    if (result.status) return result.data?.data ?? null;
    return null;
  };

  const handleDeleteFeedComment = async ({
    id,
    feedId,
  }: {
    id: number;
    feedId: number;
  }) => {
    const result = await proceedSubmitDeleteFeedComment({
      feedId: feedId,
      id: id,
    });
    return result.data ?? null;
  };

  const handleSubmitEditFeedComment = async ({
    id,
    feedId,
    formData,
  }: {
    id: number;
    feedId: number;
    formData: FormData;
  }) => {
    const result = await proceedSubmitEditFeedComment({
      formData,
      feedId: feedId,
      id: id,
    });
    return result;
  };

  const handleSubmitFeedComment = async ({
    feedId,
    formData,
  }: {
    feedId: number;
    formData: FormData;
  }) => {
    const result = await proceedSubmitFeedComment({
      formData,
      feedId: feedId,
    });
    return result;
  };

  const data: FeedCommentHookDto = {
    isLoading,
    errors,
    openFeedForm,
    openFeedFormImages,
    updateFeedItem,
    loading,
    editCommentId,
    openComment,
    setOpenComment,
    setEditCommentId,
    setIsLoading,
    register,
    handleSubmit,
    handleOpenFeedForm,
    handleOpenFeedFormImages,
    setUpdateFeedItem,
    likeFeed,
    desLikeFeed,
    fetchComments,
    deleteItemAsync,
    fetchFeeds,
    handleDeleteFeedComment,
    handleSubmitEditFeedComment,
    handleSubmitFeedComment,
  };

  return { ...data };
}

export default useFeedLikesHook;
