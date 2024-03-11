"use server";

import { ApiResponseDto, ResultFeed, ResultPaginate } from "@/app/types";
import { apiCall } from "../../api";

const basePath = "/feeds";
const urls = {
  createFeed: `${basePath}`,
  getFeeds: `${basePath}`,
};

export const proceedSubmitFeed = async (
  data: FormData
) => {
  const result: ApiResponseDto<ResultFeed> = await apiCall({
    method: "POST",
    url: `${urls.createFeed}`,
    data,
  });

  return result;
};

export const getFeeds = async ({
  revalidate,
}: {
  revalidate: boolean;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultFeed[]>> = await apiCall({
    method: "GET",
    url: `${urls.getFeeds}`,
    revalidate: revalidate,
  });

  return result;
};
