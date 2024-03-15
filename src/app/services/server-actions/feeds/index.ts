"use server";

import {
  ApiResponseDto,
  BooleanResultDto,
  FeedCommentData,
  ResultFeed,
  ResultPaginate,
} from "@/app/types";
import { apiCall } from "../../api";

const basePath = "/feeds";
const urls = {
  createFeed: `${basePath}`,
  getFeeds: `${basePath}`,
  deleteFeed: `${basePath}`,
  updateFeed: `${basePath}`,
  likeFeed: `${basePath}`
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
  if(message.trim().length == 0) {
    message = "@feed"
  }

  const result: ApiResponseDto<ResultFeed> = await apiCall({
    method: "PUT",
    url: `${urls.updateFeed}/${feedId}`,
    data: {
      message: message
    }
  });

  return result;
};

export const proceedLikeFeed = async (feedId: number) => {
  const result: ApiResponseDto<BooleanResultDto<null>> = await apiCall({
    method: "POST",
    url: `${urls.likeFeed}/${feedId}/like`,
  });

  return result;
}

export const proceedDesLikeFeed = async (feedId: number) => {
  const result: ApiResponseDto<BooleanResultDto<null>> = await apiCall({
    method: "DELETE",
    url: `${urls.likeFeed}/${feedId}/like`,
  });

  return result;
}

export const getFeedComments = async (feedId: number) => {
  const result: ApiResponseDto<ResultPaginate<FeedCommentData[]>> = await apiCall({
    method: "GET",
    url: `${urls.getFeeds}/${feedId}/comments`,
  });

  return result;
}