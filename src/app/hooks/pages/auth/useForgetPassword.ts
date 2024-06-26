import { proceedForgetPassword } from "@/app/services/server-actions";
import {
  ApiResponseDto,
  ForgetPasswordDto,
  ResultForgetPasswordDto,
} from "@/app/types";
import { forgetPasswordSchema } from "@/app/validators";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../useForm";
import { setLocalStorage } from "@/app/lib/utils";
import { localStorageKey, verifyTokenPathUrl } from "@/app/lib/constants/app";
import { notification } from "@/app/lib/notifications";
import useCustomRouter from "../../useCustomRouter";

function useForgetPassword(): ForgetPasswordHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const { handleSubmit } = useAppForm({
    schema: forgetPasswordSchema,
    defaultValues: {
      email: "",
    },
  });

  const [responseData, setResponseData] =
    useState<ApiResponseDto<ResultForgetPasswordDto> | null>(null);
  const router = useCustomRouter();

  const submitFormData = async (data: ForgetPasswordDto) => {
    setIsLoading(true);
    const result = await proceedForgetPassword({
      ...data,
    });

    setIsLoading(false);
    notification.apiNotify<ResultForgetPasswordDto>(result);

    if (result?.status && result.data) {
      //
      setLocalStorage(localStorageKey.authToken, result.data.accessToken, true);
      return router.push(`${verifyTokenPathUrl}/${result.data.otpToken}`);
    }

    notification.notifyError(`${result.message}`);
  };

  const data: ForgetPasswordHookDto = {
    isLoading,
    responseData,
    setIsLoading,
    handleSubmit,
    submitFormData,
    setToken,
  };

  return { ...data };
}

export default useForgetPassword;

export type ForgetPasswordHookDto = {
  isLoading: boolean;
  responseData: ApiResponseDto<ResultForgetPasswordDto> | null;
  submitFormData: (data: ForgetPasswordDto) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  setToken: Dispatch<SetStateAction<string>>;
};
