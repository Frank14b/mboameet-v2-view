"use server";

import {
  ApiResponseDto,
  ResultAccountSettingDto,
  AccountSettingsFormData,
} from "@/app/types/index";
import { apiCall } from "../../api";

const basePath = "/users/settings";
//
const urls = {
  updateSettings: `${basePath}`,
};

export const getAccountSettings = async () => {
  const result: ApiResponseDto<ResultAccountSettingDto> = await apiCall({
    method: "GET",
    url: `${urls.updateSettings}`,
  });

  return result;
};

export const proceedUpdateSettings = async (data: AccountSettingsFormData) => {
  const result: ApiResponseDto<ResultAccountSettingDto> = await apiCall({
    method: "PUT",
    url: `${urls.updateSettings}`,
    data,
  });

  return result;
};
