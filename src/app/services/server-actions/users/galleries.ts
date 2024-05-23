"use server";

import {
  ApiResponseDto,
  ResultAccountSettingDto
} from "@/app/types/index";
import { apiCall } from "../../api";
import { ResultUserGalleries } from "@/app/types/galleries";

const basePath = "/users/galleries";
//
const urls = {
  medias: `${basePath}`,
};

export const getGalleries = async () => {
  const result: ApiResponseDto<ResultUserGalleries> = await apiCall({
    method: "GET",
    url: `${urls.medias}`,
  });

  return result;
};
