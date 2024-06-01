"use server";

import { ApiResponseDto, ResultPaginate } from "@/app/types/index";
import { apiCall } from "../../api";
import {
  DiscussionTypes,
  ResultChatReferenceDto,
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
  formData,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  formData: FormData;
}) => {
  const result: ApiResponseDto<ResultMessageDto> = await apiCall({
    method: "POST",
    url: `${urls.getDiscussions}/${type}`,
    data: formData,
  });

  return result;
};

export const sendMessageReaction = async ({
  revalidate,
  type,
  id,
  reaction,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  id: number;
  reaction: string;
}) => {
  const result: ApiResponseDto<ResultMessageDto> = await apiCall({
    method: "PATCH",
    url: `${urls.getDiscussions}/${id}/${type}/reaction`,
    data: {
      reaction,
    },
  });

  return result;
};

export const proceedDeleteMessage = async ({
  revalidate,
  type,
  id,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  id: number;
}) => {
  const result: ApiResponseDto<ResultMessageDto> = await apiCall({
    method: "DELETE",
    url: `${urls.getDiscussions}/${id}/${type}`,
  });

  return result;
};

export const updateMessage = async ({
  revalidate,
  type,
  id,
  message,
  messagePair,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  id: number;
  message: string;
  messagePair: string;
}) => {
  const result: ApiResponseDto<ResultMessageDto> = await apiCall({
    method: "PUT",
    url: `${urls.getDiscussions}/${id}/${type}`,
    data: {
      id,
      message,
      messagePair,
    },
  });

  return result;
};

export const proceedDeleteMessages = async ({
  revalidate,
  type,
  ids,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  ids: number[];
}) => {
  const result: ApiResponseDto<ResultMessageDto> = await apiCall({
    method: "DELETE",
    url: `${urls.getDiscussions}/${type}?ids=${ids.toString()}`,
  });

  return result;
};

export const getReference = async ({
  revalidate,
  senderId,
  receiverId,
}: {
  revalidate: boolean;
  senderId: number;
  receiverId: number;
}) => {
  const result: ApiResponseDto<ResultChatReferenceDto> = await apiCall({
    method: "GET",
    url: `${urls.getDiscussions}/users/${receiverId}/reference`,
  });

  return result;
};
