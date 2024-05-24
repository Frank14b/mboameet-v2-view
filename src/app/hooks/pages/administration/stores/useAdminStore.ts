import { useAppHubContext } from "@/app/contexts/appHub";
import { createFileUploadString } from "@/app/lib/utils";
import {
  proceedUpdateProfile,
  updateProfileImage,
  validateToken,
} from "@/app/services/server-actions";
import useUserStore from "@/app/store/userStore";
import {
  ResultUpdateProfileData,
  UpdateProfileFormData,
  ApiResponseDto,
  ObjectKeyDto,
  ResultLoginDto,
} from "@/app/types";
import { UpdateProfileSchema } from "@/app/validators";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../../useForm";
import { useMainContext } from "@/app/contexts/main";
import { notification } from "@/app/lib/notifications";

const useAdminStore = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageToUpload, setImageToUpload] = useState<string | null>(null);
  const [isOpenStoreForm, setIsOpenStoreForm] = useState<boolean>(false);
  const handleIsOpenStoreForm = () => setIsOpenStoreForm((cur) => !cur);
  const [responseData, setResponseData] =
    useState<ApiResponseDto<ResultUpdateProfileData> | null>(null);
  const { user, setUser } = useUserStore();
  const { userHubs } = useAppHubContext();
  const { connectedUser } = useMainContext();

  const { handleSubmit, setValue } = useAppForm({
    schema: UpdateProfileSchema,
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: "",
    },
  });

  const changeProfilePicture = async (data: ChangeEvent<HTMLInputElement>) => {
    setImageToUpload(createFileUploadString(data));
  };

  const submitFormData = useCallback(
    async (data: UpdateProfileFormData) => {
      setIsLoading(true);
      const result = await proceedUpdateProfile(data);
      setResponseData(result);
      setIsLoading(false);
      userHubs.updateProfile();

      notification.apiNotify<ResultUpdateProfileData>(result);

      if (result.status === true) {
        setValue("password", "");
        handleIsOpenStoreForm();
      }
    },
    [setIsLoading, setValue, userHubs]
  );

  const uploadProfileImage = useCallback(
    async (image: string | Blob | ObjectKeyDto) => {
      const formData = new FormData();

      const imageBlob: any = image;
      formData.append("image", imageBlob, "profileImage.jpg");
      const result = await updateProfileImage(formData);

      notification.apiNotify<ResultUpdateProfileData>(result);

      if (result.status === true && result?.data) {
        setImageToUpload(null);
        setUser(result.data);
      }
    },
    [setImageToUpload, setUser]
  );

  const validateUserSession = useCallback(async () => {
    const result = await validateToken();
    if (result.status) {
      setUser(result.data as ResultUpdateProfileData);
    }
  }, [setUser]);

  const data: AdminStoreHookDto = {
    isLoading,
    responseData,
    imageToUpload,
    isOpenStoreForm,
    connectedUser,
    setIsLoading,
    changeProfilePicture,
    submitFormData,
    handleSubmit,
    handleIsOpenStoreForm,
    uploadProfileImage,
    validateUserSession,
  };

  return { ...data };
};

export default useAdminStore;

export type AdminStoreHookDto = {
  isLoading: boolean;
  changeProfilePicture: any;
  isOpenStoreForm: boolean;
  responseData: ApiResponseDto<ResultUpdateProfileData> | null;
  imageToUpload: string | null;
  connectedUser: ResultLoginDto | ObjectKeyDto | null;
  submitFormData: (data: UpdateProfileFormData) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleIsOpenStoreForm: () => void;
  uploadProfileImage: (image: string | Blob | ObjectKeyDto) => Promise<void>;
  validateUserSession: () => void;
};
