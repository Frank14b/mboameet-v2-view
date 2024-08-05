"use server";

import {
  ApiResponseDto,
  ResultPaginate,
  ResultStoreTypeDto,
} from "@/app/types/index";
import { apiCall } from "../../api";

const basePath = "/stores/types";
const urls = {
  getTypes: `${basePath}`,
};

export const proceedGetAdminStoreTypes = async (data: { keyword?: string }) => {
  const filter = data.keyword ? `?keyword=${data.keyword}` : ``;

  const result: ApiResponseDto<ResultPaginate<ResultStoreTypeDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getTypes}${filter}`,
    });

  return result;
};
