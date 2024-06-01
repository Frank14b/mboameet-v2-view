"use server";

import { ApiResponseDto } from "@/app/types/index";
import { apiCall } from "../../api";
import { ResultCurrencyDto } from "@/app/types/currencies";

const basePath = "/currencies";
const urls = {
  getCurrencies: `${basePath}`,
};

export const proceedGetAdminCurrencies = async (data: { keyword: string }) => {
  const result: ApiResponseDto<ResultCurrencyDto[]> = await apiCall({
    method: "GET",
    url: `${urls.getCurrencies}`,
  });

  return result;
};
