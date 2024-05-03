"use server";

import { ApiResponseDto, ResultPaginate } from "@/app/types/index";
import { apiCall } from "../../api";
import { DiscussionTypes, ResultChatUsersDto, ResultMessageDto } from "@/app/types/chats";

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
  type,
  userId,
}: {
  revalidate: boolean;
  type: DiscussionTypes;
  userId: number;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultMessageDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getDiscussions}/${type}/${userId}`,
    });

  return result;
};