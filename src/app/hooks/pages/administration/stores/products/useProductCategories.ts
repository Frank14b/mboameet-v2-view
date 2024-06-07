import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TypeOptionsProps } from "@/app/components/widgets/SelectFilterField";
import { ResultProductCategoriesDto } from "@/app/types/stores/products/categories";
import { proceedGetStoreProductCategories } from "@/app/services/server-actions/stores/products/categories";

const useProductCategories = ({ storeRef }: { storeRef?: string }) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    ResultProductCategoriesDto[] | null
  >(null);

  const handleGetProductCategories = useCallback(
    async (keyword?: string) => {
      const result = await proceedGetStoreProductCategories({
        keyword: keyword,
        storeRef: storeRef,
        manage: true,
      });
      
      setCategories(result?.data?.data ?? null);
    },
    [storeRef, setCategories]
  );

  const formattedCategories = useMemo(() => {
    if (!categories) return [];

    return categories.map((category) => {
      return {
        label: category.name,
        value: `${category.id}`,
      };
    });
  }, [categories]);

  const data: AdminProductCategoriesHookDto = {
    isLoading,
    categories: formattedCategories as TypeOptionsProps[],
    setIsLoading,
    handleGetProductCategories,
  };

  return { ...data };
};

export default useProductCategories;

export type AdminProductCategoriesHookDto = {
  isLoading: boolean;
  categories: TypeOptionsProps[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleGetProductCategories: (keyword: string) => Promise<void>;
};
