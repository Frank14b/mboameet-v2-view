import { proceedChangePassword } from "@/app/services/server-actions";
import {
  ApiResponseDto,
  BooleanResultDto,
  ChangePasswordDto,
} from "@/app/types";
import { changePasswordSchema } from "@/app/validators";
import { Dispatch, SetStateAction, useState } from "react";
import {
  UseFormHandleSubmit,
} from "react-hook-form";
import useAppForm from "../../useForm";
import { getLocalStorage } from "@/app/lib/utils";
import { localStorageKey, loginPathUrl } from "@/app/lib/constants/app";
import { notification } from "@/app/lib/notifications";
import useCustomRouter from "../../useCustomRouter";

function useChangePassword(): ChangePasswordHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  
  const {
    handleSubmit,
  } = useAppForm({
    schema: changePasswordSchema,
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
      accessToken: getLocalStorage(localStorageKey.authToken, true) as string,
    },
  });

  const [responseData, setResponseData] = useState<ApiResponseDto<
    BooleanResultDto<string>
  > | null>(null);
  const router = useCustomRouter();

  const submitFormData = async (data: ChangePasswordDto) => {
    setIsLoading(true);
    const result = await proceedChangePassword({
      ...data,
      token: token,
    });

    setIsLoading(false);
    notification.apiNotify<BooleanResultDto<string>>(result);

    if(result.status) {
      return router.push(loginPathUrl);
    }
  };
  //

  const data: ChangePasswordHookDto = {
    isLoading,
    responseData,
    setIsLoading,
    handleSubmit,
    submitFormData,
    setToken,
  };

  return { ...data };
}

export default useChangePassword;

export type ChangePasswordHookDto = {
  isLoading: boolean;
  responseData: ApiResponseDto<BooleanResultDto<string>> | null;
  submitFormData: (data: ChangePasswordDto) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  setToken: Dispatch<SetStateAction<string>>;
};
