import { ApiResponseDto, RequestMethod, ResultPaginate } from "@/app/types";
import { apiCall } from "../../api";
import { ResultStoreDto } from "@/app/types/stores";

const basePath = "/stores";
const urls = {
  createStore: `${basePath}`,
  getStores: `${basePath}`,
  updateStore: `${basePath}`,
};

export const proceedSubmitStore = async (formData: FormData, id?: number) => {
  //
  let url = `${urls.createStore}`;
  let method = "POST" as RequestMethod;

  if(id) {
    url =  `${urls.updateStore}/${id}`
    method = "PUT" as RequestMethod
  }

  const result: ApiResponseDto<ResultStoreDto> = await apiCall({
    method: method,
    url: `${url}`,
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

export const proceedGetStores = async (data?: { keyword: string }) => {
  const result: ApiResponseDto<ResultPaginate<ResultStoreDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getStores}`,
    });

  return result;
};
