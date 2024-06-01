"use server";

import { ApiResponseDto, ResultPaginate, ResultStoreTypeDto } from "@/app/types/index";
import { apiCall } from "../../api";

const basePath = "/stores/types";
const urls = {
  getTypes: `${basePath}`,
};

export const proceedGetAdminStoreTypes = async (data: { keyword: string }) => {
  const result: ApiResponseDto<ResultPaginate<ResultStoreTypeDto[]>> = await apiCall({
    method: "GET",
    url: `${urls.getTypes}?keyword=${data.keyword}`,
  });

  return result;
};
