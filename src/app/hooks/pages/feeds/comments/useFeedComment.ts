import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getFeedComments,
  proceedSubmitDeleteFeedComment,
  proceedSubmitEditFeedComment,
  proceedSubmitFeedComment,
} from "../../../../services/server-actions";
import {
  ApiResponseDto,
  BooleanResultDto,
  FeedCommentData,
  ResultFeedCommentDto,
} from "@/app/types";
import { getContentEditable } from "@/app/lib/utils";
import useFeedStore from "@/app/store/feedStore";
import { notification } from "@/app/lib/notifications";

export function useFeedComment(feedId: number): FeedCommentHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<number>(0);
  const [editCommentId, setEditCommentId] = useState<number>(0);
  const [comments, setComments] = useState<FeedCommentData[] | null>(null);
  const [updateSpinner, setUpdateSpinner] = useState<{
    status: boolean;
    error: string;
  }>({
    status: false,
    error: "",
  });
  const {
    createdFeedComment,
    deletedFeedCommentId,
    updatedFeedComment,
  } = useFeedStore();

  const fetchComments = useCallback(async () => {
    if (openComment == 0) return;

    const response = await getFeedComments(feedId);
    let result = null;

    if (response.status) {
      result = response.data?.data ?? [];
    }

    setComments(result);
    //
  }, [feedId, openComment, setComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const canAddFeedComment = useCallback(
    (data: FeedCommentData[], createdFeedComment: FeedCommentData | null) => {
      if (!createdFeedComment) return false;
      if (createdFeedComment.feedId != feedId) return false;
      if (data.length === 0) return true;

      if (data.findIndex((c) => c.id == createdFeedComment.id) == -1) {
        return true;
      }

      return false;
    },
    [feedId]
  );

  const formattedComments = useMemo(() => {
    if (openComment == 0) return [];

    const data = comments ?? [];
    //
    if (canAddFeedComment(data, createdFeedComment)) {
      data.unshift(createdFeedComment as FeedCommentData);
      setComments(data);
    }

    if (deletedFeedCommentId && comments != null) {
      const data = comments;
      const index = data.findIndex(
        (comment) => comment.id === deletedFeedCommentId
      );
      if (index != -1) {
        data.splice(index, 1);
          setComments(data);
      }
    }

    return data;
  }, [
    openComment,
    comments,
    createdFeedComment,
    deletedFeedCommentId,
    canAddFeedComment,
  ]);

  /** process to feed comment */
  const handleSubmitFeedComment = useCallback(
    async ({ feedId, formRef }: { feedId: number; formRef: string }) => {
      if (openComment == 0) return null;

      const content = getContentEditable(`${formRef}`);
      const formData = new FormData();
      let message = content.innerText;

      if (message.trim().length == 0) {
        return null;
      }
      formData.append("content", message);

      const result = await proceedSubmitFeedComment({
        formData,
        feedId: feedId,
      });

      notification.apiNotify<ResultFeedCommentDto>(result);

      if (result.status) {
        content.innerHTML = "";
      }
      return result;
    },
    [openComment]
  );

  const handleEditComment = useCallback(
    async (data: {
      formRef: string;
      feedId: number;
      updateItem: FeedCommentData;
    }) => {
      if (openComment == 0) return null;
      //
      setUpdateSpinner({ status: true, error: "" });
      const content = getContentEditable(`${data.formRef}`);
      const currentContext = data.updateItem.content;
      data.updateItem.content = content.innerText; // set the current updated content to the comment

      const formData = new FormData();
      let message = content.innerText;
      if (message.trim().length == 0) {
        return null;
      }
      formData.append("content", message);

      const result = await proceedSubmitEditFeedComment({
        id: data.updateItem.id,
        feedId: data.feedId,
        formData,
      });

      notification.apiNotify<ResultFeedCommentDto>(result);

      if (result?.status != true) {
        data.updateItem.content = currentContext; // revert the previous content if the update failed
        setUpdateSpinner({
          status: false,
          error: result?.message ?? "An error occurred",
        });
        return null;
      }
      content.innerHTML = "";
      setUpdateSpinner({ status: false, error: "" });
      setEditCommentId(0); // reset comment edit id
      return result;
    },
    [openComment]
  );

  const handleDeleteComment = useCallback(
    async (id: number) => {
      if (openComment == 0) return;
      //
      setUpdateSpinner({ status: true, error: "" });
      //
      const result = await proceedSubmitDeleteFeedComment({
        id: id,
        feedId: feedId,
      });

      notification.apiNotify<BooleanResultDto<null>>(result);

      if (result?.status != true) {
        setUpdateSpinner({
          status: false,
          error: result?.message ?? "An error occurred",
        });
        return;
      }
      setUpdateSpinner({ status: false, error: "" });
      return;
    },
    [feedId, openComment]
  );

  const data: FeedCommentHookDto = {
    isLoading,
    editCommentId,
    openComment,
    comments: formattedComments,
    updatedFeedComment: updatedFeedComment,
    updateSpinner,
    setOpenComment,
    setEditCommentId,
    setIsLoading,
    handleSubmitFeedComment,
    handleDeleteComment,
    handleEditComment,
  };

  return { ...data };
}

export default useFeedComment;

export interface FeedCommentHookDto {
  isLoading: boolean;
  comments: FeedCommentData[] | null;
  editCommentId: number;
  openComment: number;
  updatedFeedComment: ResultFeedCommentDto | null;
  updateSpinner: { status: boolean; error: string };
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setOpenComment: Dispatch<SetStateAction<number>>;
  setEditCommentId: Dispatch<SetStateAction<number>>;
  handleSubmitFeedComment: ({
    feedId,
    formRef,
  }: {
    feedId: number;
    formRef: string;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
  handleDeleteComment: (id: number) => Promise<void>;
  handleEditComment: (data: {
    formRef: string;
    feedId: number;
    updateItem: FeedCommentData;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
}
