"use server";

import {
  ApiResponseDto,
  ResultUpdateProfileData,
  UpdateProfileFormData,
} from "@/app/types/index";
import { apiCall } from "../../api";

const basePath = "/users";
const urls = {
  updateProfile: `${basePath}`,
  updateProfileImage: `${basePath}/picture`,
};

export const proceedUpdateProfile = async (
  data: UpdateProfileFormData
): Promise<ApiResponseDto<ResultUpdateProfileData>> => {
  
    const result: ApiResponseDto<ResultUpdateProfileData> = await apiCall({
      method: "PUT",
      url: `${urls.updateProfile}`,
      data,
    });

    return result;
};

export const updateProfileImage = async (data: FormData) => {

  const result: ApiResponseDto<ResultUpdateProfileData> = await apiCall({
    method: "PUT",
    url: `${urls.updateProfileImage}`,
    data,
  });

  return result;
};
