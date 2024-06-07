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
      return {
        ...product,
        image: getFileUrl(product.image, product.store.userId, ""),
        reference: product.reference.toLowerCase(),
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
