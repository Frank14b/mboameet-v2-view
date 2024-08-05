import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiResponseDto, ObjectKeyDto, ResultLoginDto } from "@/app/types";
import { FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../../../useForm";
import { useMainContext } from "@/app/contexts/main";
import { notification } from "@/app/lib/notifications";
import {
  createFileUploadString,
  fileExtFromBase64,
  parseJsonString,
} from "@/app/lib/utils";
import {
  proceedDeleteProduct,
  proceedGetAdminStoreProducts,
  proceedSubmitProduct,
  proceedSubmitProductImage,
} from "@/app/services/server-actions/stores/products";
import { CreateProductSchema } from "@/app/validators/administration/products";
import { CreateProductFormDto } from "@/app/types/administration/stores/products";
import { ResultProductDto } from "@/app/types/stores/products";

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
    useState<ApiResponseDto<ResultProductDto> | null>(null);
  const { connectedUser, getFileUrl } = useMainContext();
  const [storeCroppedLogo, setStoreCroppedLogo] = useState<ObjectKeyDto | null>(
    null
  );
  const [products, setProducts] = useState<ResultProductDto[] | null>(null);
  const [isEditableForm, setIsEditableForm] = useState<boolean>(false);

  const { formState, handleSubmit, setValue, reset } = useAppForm({
    schema: CreateProductSchema,
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      quantity: 10,
      isUnlimited: true,
      photo: null,
      productCategoryId: 0,
      price: 0,
      priceUnit: 0,
      priceUnitType: "",
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

  const getProducts = useCallback(async () => {
    const result = await proceedGetAdminStoreProducts({
      keyword: "",
      storeRef,
    });
    setProducts(result?.data?.data ?? null);
    setIsFetchingProduct(false);
  }, [storeRef, setProducts, setIsFetchingProduct]);

  const submitFormData = useCallback(
    async (data: CreateProductFormDto & { id?: number }) => {
      //
      setIsLoading(true);
      setResponseData(null);

      const formData = new FormData();

      const dataKeys = Object.entries(data);
      dataKeys.forEach(([key, value]) => {
        if (key == "id") {
          // do nothing
        } else if (key == "photo") {
          if (!data.id || data.id == 0) {
            formData.append(
              "image",
              storeCroppedLogo?.blob,
              `store-product-image.${fileExtFromBase64(
                storeCroppedLogo?.base64
              )}`
            );
          }
        } else if (key == "description") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const result = await proceedSubmitProduct(formData, storeRef, data.id);
      setResponseData(result);
      setIsLoading(false);

      notification.apiNotify(result);

      if (result.status === true) {
        handleIsOpenStoreForm();
        reset();
        setStoreCroppedLogo(null);
        getProducts();
      }
    },
    [
      storeRef,
      storeCroppedLogo,
      reset,
      setStoreCroppedLogo,
      handleIsOpenStoreForm,
      setResponseData,
      setIsLoading,
      getProducts,
    ]
  );

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

  const uploadProductImage = useCallback(
    async (image: ObjectKeyDto, productRef: string) => {
      const formData = new FormData();

      formData.append(
        "image",
        image.blob,
        `store-product-image.${fileExtFromBase64(image.base64)}`
      );
      formData.append("fileType", "image");

      await proceedSubmitProductImage(formData, storeRef, productRef);

      getProducts();
    },
    [storeRef, getProducts]
  );

  const handleEditStoreProduct = useCallback(
    (item: ResultProductDto) => {
      setValue("id", item.id);
      setValue("description", item.description);
      setValue("isUnlimited", item.isUnlimited);
      setValue("name", item.name);
      setValue("quantity", item.quantity);
      setValue("price", item.price);
      setValue("priceUnit", item.priceUnit);
      setValue("priceUnitType", item.priceUnitType);
      setValue("productCategoryId", item.productCategory.id);
      //
      setIsEditableForm(true);
      handleIsOpenStoreForm();
    },
    [handleIsOpenStoreForm]
  );

  const handleDeleteProduct = useCallback(async (item: ResultProductDto) => {
    const result = await proceedDeleteProduct(item.id, storeRef);

    notification.apiNotify(result);

    if(result.status) {
      getProducts();
    }
  }, [getProducts]);

  const data: AdminStoreProductHookDto = {
    storeRef,
    isLoading,
    isFetchingProduct,
    responseData,
    selectedImage,
    croppedImage: storeCroppedLogo as ObjectKeyDto,
    isOpenStoreForm,
    connectedUser,
    formErrors: errors,
    products: formattedProducts as ResultProductDto[],
    isEditableForm,
    handleUpdatePhotoField,
    handleCroppedImage,
    setIsLoading,
    selectImageFile,
    submitFormData,
    handleSubmit,
    handleIsOpenStoreForm: () => {
      reset();
      setIsEditableForm(false);
      handleIsOpenStoreForm();
    },
    uploadProductImage,
    handleEditStoreProduct,
    handleDeleteProduct,
  };

  return { ...data };
};

export default useAdminStoreProduct;

export type AdminStoreProductHookDto = {
  storeRef: string;
  isLoading: boolean;
  isFetchingProduct: boolean;
  isOpenStoreForm: boolean;
  responseData: ApiResponseDto<ResultProductDto> | null;
  selectedImage: string | null;
  connectedUser: ResultLoginDto | ObjectKeyDto | null;
  formErrors: FieldErrors<CreateProductFormDto>;
  croppedImage: ObjectKeyDto;
  products: ResultProductDto[];
  isEditableForm: boolean;
  submitFormData: (data: CreateProductFormDto) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleIsOpenStoreForm: () => void;
  selectImageFile: (data: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCroppedImage: (image: string | Blob | ObjectKeyDto) => Promise<void>;
  uploadProductImage: (
    image: ObjectKeyDto,
    productRef: string
  ) => Promise<void>;
  handleUpdatePhotoField: (value: string | null) => void;
  handleEditStoreProduct: (item: ResultProductDto) => void;
  handleDeleteProduct: (item: ResultProductDto) => void;
};