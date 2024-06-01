import { ApiResponseDto, ResultPaginate } from "@/app/types";
import { apiCall } from "../../../api";
import { ResultStoreDto } from "@/app/types/stores";

const basePath = "/stores";
const urls = {
  createProduct: `${basePath}`,
  getAdminProducts: `${basePath}`,
};

export const proceedSubmitProduct = async (
  formData: FormData,
  storeRef: string
) => {
  //
  const result: ApiResponseDto<ResultStoreDto> = await apiCall({
    method: "POST",
    url: `${urls.createProduct}/${storeRef}/products`,
    data: formData,
  });

  return result;
};

export const proceedGetAdminStoreProducts = async (data?: {
  keyword: string;
  storeRef: string;
}) => {
  const result: ApiResponseDto<ResultPaginate<ResultStoreDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getAdminProducts}/${data?.storeRef}/products?manage=${true}`,
    });

  return result;
};
