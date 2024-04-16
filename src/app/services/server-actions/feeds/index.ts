"use server";

import {
  ApiResponseDto,
  BooleanResultDto,
  FeedCommentData,
  ResultFeed,
  ResultFeedCommentDto,
  ResultPaginate,
} from "@/app/types";
import { apiCall } from "../../api";

const basePath = "/feeds";
const urls = {
  createFeed: `${basePath}`,
  getFeeds: `${basePath}`,
  deleteFeed: `${basePath}`,
  updateFeed: `${basePath}`,
  likeFeed: `${basePath}`,
};

export const proceedSubmitFeed = async (formData: FormData) => {
  //
  const result: ApiResponseDto<ResultFeed> = await apiCall({
    method: "POST",
    url: `${urls.createFeed}`,
    data: formData,
  });

  return result;
};

export const getFeeds = async ({ revalidate }: { revalidate: boolean }) => {
  const result: ApiResponseDto<ResultPaginate<ResultFeed[]>> = await apiCall({
    method: "GET",
    url: `${urls.getFeeds}`,
    revalidate: revalidate,
  });

  console.log("🚀 ~ getFeeds ~ result:", result.data?.data[0])

  return result;
};

export const proceedDeleteFeed = async (feedId: number) => {
  const result: ApiResponseDto<BooleanResultDto<null>> = await apiCall({
    method: "DELETE",
    url: `${urls.deleteFeed}/${feedId}`,
  });

  return result;
};

export const proceedUpdateFeed = async ({
  feedId,
  message,
}: {
  feedId: number;
  message: string;
}) => {
  //
  if (message.trim().length == 0) {
    message = "@feed";
  }

  const result: ApiResponseDto<ResultFeed> = await apiCall({
    method: "PUT",
    url: `${urls.updateFeed}/${feedId}`,
    data: {
      message: message,
    },
  });

  return result;
};

export const proceedLikeFeed = async (feedId: number) => {
  const result: ApiResponseDto<BooleanResultDto<null>> = await apiCall({
    method: "POST",
    url: `${urls.likeFeed}/${feedId}/like`,
  });

  return result;
};

export const proceedDesLikeFeed = async (feedId: number) => {
  const result: ApiResponseDto<BooleanResultDto<null>> = await apiCall({
    method: "DELETE",
    url: `${urls.likeFeed}/${feedId}/like`,
  });

  return result;
};

export const getFeedComments = async (feedId: number) => {
  const result: ApiResponseDto<ResultPaginate<FeedCommentData[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getFeeds}/${feedId}/comments?page=1&limit=20&sort=desc`,
    });
    
  return result;
};

export const proceedSubmitFeedComment = async ({
  formData,
  feedId,
}: {
  formData: FormData;
  feedId: number;
}) => {
  const result: ApiResponseDto<ResultFeedCommentDto> = await apiCall({
    method: "POST",
    url: `${urls.getFeeds}/${feedId}/comments`,
    data: formData,
  });

  return result;
};

export const proceedSubmitEditFeedComment = async ({
  formData,
  feedId,
  id,
}: {
  formData: FormData;
  feedId: number;
  id: number;
}) => {
  const result: ApiResponseDto<ResultFeedCommentDto> = await apiCall({
    method: "PUT",
    url: `${urls.getFeeds}/${feedId}/comments/${id}`,
    data: formData,
  });

  return result;
};

export const proceedSubmitDeleteFeedComment = async ({
  feedId,
  id,
}: {
  feedId: number;
  id: number;
}) => {
  const result: ApiResponseDto<BooleanResultDto<null>> = await apiCall({
    method: "DELETE",
    url: `${urls.getFeeds}/${feedId}/comments/${id}`,
  });

  return result;
};
