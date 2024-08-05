import { createFileUploadString, fileExtFromBase64 } from "@/app/lib/utils";
import {
  ApiResponseDto,
  ObjectKeyDto,
  ResultLoginDto,
  ResultStoreTypeDto,
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
import useAppForm from "../../../useForm";
import { useMainContext } from "@/app/contexts/main";
import { notification } from "@/app/lib/notifications";
import { CreateStoreSchema } from "@/app/validators/administration/stores";
import { CreateStoreFormDto } from "@/app/types/administration/stores";
import { proceedGetAdminStoreTypes } from "@/app/services/server-actions/stores/storeTypes";
import { TypeOptionsProps } from "@/app/components/widgets/SelectFilterField";
import { proceedGetAdminCurrencies } from "@/app/services/server-actions/currencies";
import { ResultCurrencyDto } from "@/app/types/currencies";
import {
  proceedGetAdminStores,
  proceedSubmitStore,
} from "@/app/services/server-actions/stores";
import { ResultStoreDto } from "@/app/types/stores";

const useAdminStore = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingStore, setIsFetchingStore] = useState<boolean>(true);
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
  const [storeTypes, setStoreTypes] = useState<ResultStoreTypeDto[] | null>(
    null
  );
  const [currencies, setCurrencies] = useState<ResultCurrencyDto[] | null>(
    null
  );
  const [stores, setStores] = useState<ResultStoreDto[] | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { formState, handleSubmit, setValue, reset } = useAppForm({
    schema: CreateStoreSchema,
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      address: "",
      phoneNumber: "",
      callingCode: "",
      photo: null,
      currencyId: 0,
      storeTypeId: 0,
      website: "",
      city: "",
      country: {},
      email: "",
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

  const getStores = useCallback(async () => {
    const result = await proceedGetAdminStores();
    setStores(result?.data?.data ?? null);
    setIsFetchingStore(false);
  }, []);

  const submitFormData = useCallback(
    async (data: CreateStoreFormDto & { id?: number }) => {
      //
      setIsLoading(true);
      setResponseData(null);

      const formData = new FormData();

      const dataKeys = Object.entries(data);
      dataKeys.forEach(([key, value]) => {
        if (key == "id") {
          // do nothing
        } else if (key == "country") {
          formData.append(key, value.name);
          formData.append("callingCode", value.callingCode);
        } else if (key == "photo") {
          if (storeCroppedLogo?.base64) {
            formData.append(
              "logo",
              storeCroppedLogo?.blob,
              `store-logo.${fileExtFromBase64(storeCroppedLogo?.base64)}`
            );
          }
        } else {
          formData.append(key, value);
        }
      });

      const result = await proceedSubmitStore(formData, data?.id);
      setResponseData(result);
      setIsLoading(false);

      notification.apiNotify(result);

      if (result?.status === true) {
        handleIsOpenStoreForm();
        reset();
        setStoreCroppedLogo(null);
        getStores();
      }
    },
    [
      storeCroppedLogo,
      reset,
      setStoreCroppedLogo,
      handleIsOpenStoreForm,
      setResponseData,
      setIsLoading,
      getStores
    ]
  );

  const handleGetstoreTypes = useCallback(
    async (keyword?: string) => {
      const result = await proceedGetAdminStoreTypes({
        keyword: keyword,
      });
      setStoreTypes(result?.data?.data ?? null);
    },
    [setStoreTypes]
  );

  const formattedTypes = useMemo(() => {
    if (!storeTypes) return [];

    return storeTypes.map((storeType) => {
      return {
        label: storeType.name,
        value: `${storeType.id}`,
      };
    });
  }, [storeTypes]);

  const getCurrencies = useCallback(async () => {
    const result = await proceedGetAdminCurrencies({
      keyword: "",
    });
    setCurrencies(result?.data ?? null);
    return result?.data ?? null;
  }, []);

  const formattedCurrencies = useMemo(() => {
    if (!currencies) return [];
    return currencies.map((currency) => {
      return {
        label: `${currency.name} (${currency.code})`,
        value: `${currency.id}`,
      };
    });
  }, [currencies]);

  useEffect(() => {
    handleGetstoreTypes("");
    getStores();
  }, [getStores, handleGetstoreTypes]);

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

  const handleEditStore = useCallback(
    (item: ResultStoreDto) => {
      setValue("id", item.id);
      setValue("address", item.address);
      setValue("callingCode", item.callingCode);
      setValue("description", item.description);
      setValue("name", item.name);
      setValue("phoneNumber", item.phoneNumber);
      setValue("storeTypeId", item.storeType.id);
      setValue("currencyId", item.currency.id);
      setValue("city", item.city);
      setValue("country", {
        name: item.country,
        callingCode: item.callingCode,
      });
      setValue("callingCode", item.callingCode);
      setValue("email", item.email ?? "");
      setValue("website", item.website ?? "");
      //
      setIsEditable(true);
      handleIsOpenStoreForm();
    },
    [setValue, handleIsOpenStoreForm]
  );

  const data: AdminStoreHookDto = {
    isLoading,
    isFetchingStore,
    responseData,
    selectedImage,
    croppedImage: storeCroppedLogo as ObjectKeyDto,
    isOpenStoreForm,
    connectedUser,
    formErrors: errors,
    storeTypes: formattedTypes as TypeOptionsProps[],
    currencies: formattedCurrencies as TypeOptionsProps[],
    stores: formattedStores as ResultStoreDto[],
    isEditable,
    getCurrencies,
    handleUpdatePhotoField,
    handleCroppedImage,
    setIsLoading,
    selectImageFile,
    submitFormData,
    handleSubmit,
    handleIsOpenStoreForm: () => {
      reset();
      setIsEditable(false);
      handleIsOpenStoreForm();
    },
    handleGetstoreTypes,
    handleEditStore,
  };

  return { ...data };
};

export default useAdminStore;

export type AdminStoreHookDto = {
  isLoading: boolean;
  isFetchingStore: boolean;
  isOpenStoreForm: boolean;
  responseData: ApiResponseDto<ResultStoreDto> | null;
  selectedImage: string | null;
  connectedUser: ResultLoginDto | ObjectKeyDto | null;
  formErrors: FieldErrors<CreateStoreFormDto>;
  croppedImage: ObjectKeyDto;
  storeTypes: TypeOptionsProps[];
  currencies: TypeOptionsProps[];
  stores: ResultStoreDto[];
  isEditable: boolean;
  getCurrencies: () => Promise<ResultCurrencyDto[] | null>;
  submitFormData: (data: CreateStoreFormDto) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleIsOpenStoreForm: () => void;
  selectImageFile: (data: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCroppedImage: (image: string | Blob | ObjectKeyDto) => Promise<void>;
  handleUpdatePhotoField: (value: string | null) => void;
  handleGetstoreTypes: (keyword: string) => Promise<void>;
  handleEditStore: (item: ResultStoreDto) => void;
};
