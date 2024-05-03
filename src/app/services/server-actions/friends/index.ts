"use server";

import { ApiResponseDto, ResultPaginate } from "@/app/types/index";
import { apiCall } from "../../api";
import { FriendsTypes, ResultFriendsDto } from "@/app/types/friends";

const basePath = "/users";
const basePathMatch = "/matches";

const urls = {
  getFriends: `${basePath}`,
  followFriend: `${basePathMatch}`,
};

export const getFriends = async ({
  revalidate,
  type,
}: {
  revalidate: boolean;
  type: FriendsTypes;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultFriendsDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getFriends}?type=${type}`,
    });

  return result;
};

export const proceedFollowFriend = async ({ userId }: { userId: number }) => {
  const result: ApiResponseDto<ResultFriendsDto[]> = await apiCall({
    method: "POST",
    url: `${urls.followFriend}`,
    data: {
      matchedUserId: userId,
    },
  });

  return result;
};
