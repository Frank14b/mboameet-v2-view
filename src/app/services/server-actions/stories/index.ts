"use server";

import {
  ApiResponseDto,
  BooleanResultDto,
  ResultPaginate,
  ResultStoriesDto,
} from "@/app/types";
import { apiCall } from "../../api";

const basePath = "/stories";
const urls = {
  saveStories: `${basePath}`,
  getStories: `${basePath}`,
};

export const proceedSaveStories = async (data: FormData) => {
  const result: ApiResponseDto<BooleanResultDto<any>> = await apiCall({
    method: "POST",
    url: `${urls.saveStories}`,
    data,
  });

  return result;
};

export const proceedGetStories = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultStoriesDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getStories}`,
      params: {
        page,
        limit,
      },
    });

  return result;
};
