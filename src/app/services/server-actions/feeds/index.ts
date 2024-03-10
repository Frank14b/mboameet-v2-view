"use server";

import { ApiResponseDto, ResultFeed } from "@/app/types";
import { apiCall } from "../../api";

const basePath = "/feeds";
const urls = {
  createFeed: `${basePath}`,
  getFeeds: `${basePath}`,
};

export const proceedSubmitFeed = async (
  data: FormData
): Promise<ApiResponseDto<ResultFeed>> => {
  const result: ApiResponseDto<ResultFeed> = await apiCall({
    method: "POST",
    url: `${urls.createFeed}`,
    data,
  });

  return result;
};

export const getFeeds = async (): Promise<ApiResponseDto<ResultFeed[]>> => {
  const result: ApiResponseDto<ResultFeed[]> = await apiCall({
    method: "GET",
    url: `${urls.getFeeds}`,
  });

  return result;
};
