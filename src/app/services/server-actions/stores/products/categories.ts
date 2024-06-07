import { ApiResponseDto, ResultPaginate } from "@/app/types";
import { apiCall } from "../../../api";
import { ResultStoreDto } from "@/app/types/stores";

const basePath = "/stores";
const urls = {
  getCategories: `${basePath}`,
};

export const proceedGetStoreProductCategories = async (data: {
  keyword?: string;
  storeRef?: string;
  manage?: boolean;
}) => {
  //
  let filter = null;
  if (data?.keyword) {
    filter = `&keyword=${data.keyword}`;
  }

  let storePath = "";
  if (data?.storeRef) {
    storePath = `/${data.storeRef}`;
  }

  const result: ApiResponseDto<ResultPaginate<ResultStoreDto[]>> =
    await apiCall({
      method: "GET",
      url: `${urls.getCategories}${storePath}/products/categories?manage=${
        data?.manage ?? false
      }${filter}`,
    });

  return result;
};
