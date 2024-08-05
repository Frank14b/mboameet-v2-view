import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMainContext } from "@/app/contexts/main";
import { proceedGetStoreProducts } from "@/app/services/server-actions/stores/products";
import { ResultProductDto } from "@/app/types/stores/products";
import { parseJsonString } from "@/app/lib/utils";

const useProducts = ({ storeRef }: { storeRef?: string }) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(true);
  const { getFileUrl } = useMainContext();
  const [products, setProducts] = useState<ResultProductDto[] | null>(null);

  const getProducts = useCallback(async () => {
    const result = await proceedGetStoreProducts({
      storeRef,
    });

    setProducts(result?.data?.data ?? null);
    setIsFetchingProduct(false);
  }, [storeRef, setProducts, setIsFetchingProduct]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const formattedProducts = useMemo(() => {
    if (!products) return [];
    return products.map((product) => {
      //
      product.image = getFileUrl(product.image, product.store.userId, "");

      product.files.push({
        id: 0,
        url: product.image,
        previewUrl: product.image,
        type: "",
      });
      return {
        ...product,
        reference: product.reference.toLowerCase(),
        description: parseJsonString(product.description),
        files: product.files.map((file) => {
          return {
            ...file,
            url: getFileUrl(file.url, product.store.userId, ""),
            previewUrl: getFileUrl(file.previewUrl, product.store.userId, ""),
          };
        }),
      };
    });
  }, [products, getFileUrl]);

  const data: StoreProductHookDto = {
    isLoading,
    isFetchingProduct,
    products: formattedProducts as ResultProductDto[],
    setIsLoading,
  };

  return { ...data };
};

export default useProducts;

export type StoreProductHookDto = {
  isLoading: boolean;
  isFetchingProduct: boolean;
  products: ResultProductDto[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
