import { ApiResponseDto, ResultPaginate } from "@/app/types";
import { apiCall } from "../../api";
import { ResultStoreDto } from "@/app/types/stores";

const basePath = "/stores";
const urls = {
  createStore: `${basePath}`,
  getStores: `${basePath}`,
};

export const proceedSubmitStore = async (formData: FormData) => {
  //
  const result: ApiResponseDto<ResultStoreDto> = await apiCall({
    method: "POST",
    url: `${urls.createStore}`,
    data: formData,
  });

  return result;
};

export const proceedGetAdminStores = async (data?: { keyword: string }) => {
  const result: ApiResponseDto<ResultPaginate<ResultStoreDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getStores}?manage=${true}`,
    });

  return result;
};
