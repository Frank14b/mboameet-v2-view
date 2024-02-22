"use server";

import {
  ApiResponseDto,
  ObjectKeyDto,
  ResultUpdateProfileData,
  UpdateProfileFormData,
} from "@/app/types/index";
import { ApiErrorMessage, ApiSuccessMessage, apiCall } from "../../api";

const basePath = "/users";
const urls = {
  updateProfile: `${basePath}`,
};

export const proceedUpdateProfile = async (
  data: UpdateProfileFormData
): Promise<ApiResponseDto<ResultUpdateProfileData>> => {
  try {
    const result: ObjectKeyDto | undefined = await apiCall({
      method: "PUT",
      url: `${urls.updateProfile}`,
      data,
    });

    return ApiSuccessMessage(result);
  } catch (error: any) {
    return ApiErrorMessage(error);
  }
    
};
