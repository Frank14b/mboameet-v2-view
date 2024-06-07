import { createFileUploadString, fileExtFromBase64 } from "@/app/lib/utils";
import {
  ApiResponseDto,
  ObjectKeyDto,
  ResultLoginDto,
  // ResultStoreTypeDto,
} from "@/app/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../../../useForm";
import { useMainContext } from "@/app/contexts/main";
import { notification } from "@/app/lib/notifications";
import { CreateStoreSchema } from "@/app/validators/administration/stores";
import { CreateStoreFormDto } from "@/app/types/administration/stores";
import { proceedGetAdminStoreTypes } from "@/app/services/server-actions/stores/storeTypes";
import { TypeOptionsProps } from "@/app/components/widgets/SelectFilterField";
// import { proceedGetAdminCurrencies } from "@/app/services/server-actions/currencies";
import { ResultCurrencyDto } from "@/app/types/currencies";
import {
  // proceedGetAdminStores,
  proceedSubmitStore,
} from "@/app/services/server-actions/stores";
import { ResultStoreDto } from "@/app/types/stores";
import { ResultProductCategoriesDto } from "@/app/types/stores/products/categories";
import { proceedGetAdminStoreProducts } from "@/app/services/server-actions/stores/products";

const useAdminStoreProduct = (storeRef: string) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpenStoreForm, setIsOpenStoreForm] = useState<boolean>(false);
  const handleIsOpenStoreForm = useCallback(
    () => setIsOpenStoreForm((cur) => !cur),
    [setIsOpenStoreForm]
  );
  const [responseData, setResponseData] =
    useState<ApiResponseDto<ResultStoreDto> | null>(null);
  const { connectedUser, getFileUrl } = useMainContext();
  const [storeCroppedLogo, setStoreCroppedLogo] = useState<ObjectKeyDto | null>(
    null
  );
  const [categories, setCategories] = useState<
    ResultProductCategoriesDto[] | null
  >(null);
  // const [currencies, setCurrencies] = useState<ResultCurrencyDto[] | null>(
  //   null
  // );
  const [stores, setStores] = useState<ResultStoreDto[] | null>(null);

  const { formState, handleSubmit, setValue, reset } = useAppForm({
    schema: CreateStoreSchema,
    defaultValues: {
      name: "",
      description: "",
      address: null,
      phoneNumber: null,
      callingCode: "",
      photo: null,
    },
  });
  const { errors } = formState;

  const selectImageFile = async (data: ChangeEvent<HTMLInputElement>) => {
    setValue("photo", null);
    setSelectedImage(createFileUploadString(data));
  };

  const handleCroppedImage = useCallback(
    async (image: string | Blob | ObjectKeyDto) => {
      const file = image as ObjectKeyDto;
      setValue("photo", file?.base64);
      setStoreCroppedLogo(file);
      setSelectedImage("");
    },
    [setValue, setStoreCroppedLogo, setSelectedImage]
  );

  const handleUpdatePhotoField = useCallback(
    (value: string | null) => {
      setValue("photo", value as any);
    },
    [setValue]
  );

  const submitFormData = useCallback(
    async (data: CreateStoreFormDto) => {
      //
      setIsLoading(true);
      setResponseData(null);

      const formData = new FormData();

      const dataKeys = Object.entries(data);
      dataKeys.forEach(([key, value]) => {
        if (key == "country") {
          formData.append(key, value.name);
          formData.append("callingCode", value.callingCode);
        } else if (key == "photo") {
          formData.append(
            "logo",
            storeCroppedLogo?.blob,
            `store-logo.${fileExtFromBase64(storeCroppedLogo?.base64)}`
          );
        } else {
          formData.append(key, value);
        }
      });

      const result = await proceedSubmitStore(formData);
      setResponseData(result);
      setIsLoading(false);

      notification.apiNotify(result);

      if (result.status === true) {
        handleIsOpenStoreForm();
        reset();
        setStoreCroppedLogo(null);
      }
    },
    [
      storeCroppedLogo,
      reset,
      setStoreCroppedLogo,
      handleIsOpenStoreForm,
      setResponseData,
      setIsLoading,
    ]
  );

  const handleGetProductCategories = useCallback(
    async (keyword: string) => {
      const result = await proceedGetAdminStoreTypes({
        keyword: keyword,
      });
      setCategories(result?.data?.data ?? null);
    },
    [setCategories]
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

  const getStores = useCallback(async () => {
    const result = await proceedGetAdminStoreProducts();
    setStores(result?.data?.data ?? null);
    setIsFetchingProduct(false);
  }, []);

  useEffect(() => {
    getStores();
  }, [getStores]);

  const formattedStores = useMemo(() => {
    if (!stores) return [];
    return stores.map((store) => {
      return {
        ...store,
        logo: getFileUrl(store.logo, store.user.id, store.user.name),
        reference: store.reference.toLowerCase(),
      };
    });
  }, [stores, getFileUrl]);

  const data: AdminStoreProductHookDto = {
    isLoading,
    isFetchingProduct,
    responseData,
    selectedImage,
    croppedImage: storeCroppedLogo as ObjectKeyDto,
    isOpenStoreForm,
    connectedUser,
    formErrors: errors,
    categories: formattedCategories as TypeOptionsProps[],
    stores: formattedStores as ResultStoreDto[],
    handleUpdatePhotoField,
    handleCroppedImage,
    setIsLoading,
    selectImageFile,
    submitFormData,
    handleSubmit,
    handleIsOpenStoreForm,
    handleGetProductCategories,
  };

  return { ...data };
};

export default useAdminStoreProduct;

export type AdminStoreProductHookDto = {
  isLoading: boolean;
  isFetchingProduct: boolean;
  isOpenStoreForm: boolean;
  responseData: ApiResponseDto<ResultStoreDto> | null;
  selectedImage: string | null;
  connectedUser: ResultLoginDto | ObjectKeyDto | null;
  formErrors: FieldErrors<CreateStoreFormDto>;
  croppedImage: ObjectKeyDto;
  categories: TypeOptionsProps[];
  stores: ResultStoreDto[];
  submitFormData: (data: CreateStoreFormDto) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleIsOpenStoreForm: () => void;
  selectImageFile: (data: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCroppedImage: (image: string | Blob | ObjectKeyDto) => Promise<void>;
  handleUpdatePhotoField: (value: string | null) => void;
  handleGetProductCategories: (keyword: string) => Promise<void>;
};
