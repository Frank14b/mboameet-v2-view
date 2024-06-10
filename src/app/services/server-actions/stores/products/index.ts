import { ApiResponseDto, ResultPaginate } from "@/app/types";
import { apiCall } from "../../../api";
import { ResultProductDto } from "@/app/types/stores/products";

const basePath = "/stores";
const urls = {
  createProduct: `${basePath}`,
  getAdminProducts: `${basePath}`,
  getProducts: `${basePath}`,
};

export const proceedSubmitProduct = async (
  formData: FormData,
  storeRef: string
) => {
  //
  const result: ApiResponseDto<ResultProductDto> = await apiCall({
    method: "POST",
    url: `${urls.createProduct}/${storeRef}/products`,
    data: formData,
  });

  return result;
};

export const proceedGetAdminStoreProducts = async (data: {
  keyword: string;
  storeRef: string;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultProductDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getAdminProducts}/${data.storeRef}/products?manage=${true}`,
    });

  return result;
};

export const proceedGetStoreProducts = async (data: {
  keyword?: string;
  storeRef?: string;
}) => {
  //
  let store = "";
  if (data?.storeRef) {
    store = `/${data.storeRef}`;
  }

  const result: ApiResponseDto<ResultPaginate<ResultProductDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getProducts}${store}/products`,
    });

  return result;
};

export const proceedSubmitProductImage = async (
  formData: FormData,
  storeRef: string,
  productRef: string
) => {
  //
  const result: ApiResponseDto<ResultProductDto> = await apiCall({
    method: "POST",
    url: `${basePath}/${storeRef}/products/${productRef}/files`,
    data: formData,
  });

  return result;
};