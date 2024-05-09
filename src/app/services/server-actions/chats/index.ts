"use server";

import {
  ApiResponseDto,
  ResultPaginate,
} from "@/app/types/index";
import { apiCall } from "../../api";
import {
  DiscussionTypes,
  ResultChatUsersDto,
  ResultMessageByReferenceDto,
  ResultMessageDto,
} from "@/app/types/chats";

const basePath = "/chats";

const urls = {
  getDiscussions: `${basePath}`,
};

export const getDiscussions = async ({
  revalidate,
  type,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultChatUsersDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getDiscussions}/${type}`,
    });

  return result;
};

export const getMessages = async ({
  revalidate,
  reference,
  cursor,
}: {
  revalidate: boolean;
  reference: string;
  cursor: number;
}) => {
  const result: ApiResponseDto<ResultMessageByReferenceDto> = await apiCall({
    method: "GET",
    url: `${urls.getDiscussions}/${reference}?cursor=${cursor}`,
  });

  return result;
};

export const sendMessage = async ({
  revalidate,
  type,
  userId,
  message,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  userId: number;
  message: string;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultMessageDto[]>> =
    await apiCall({
      method: "POST",
      url: `${urls.getDiscussions}/${type}`,
      data: {
        receiver: userId,
        messageType: 0,
        message,
      },
    });

  return result;
};
