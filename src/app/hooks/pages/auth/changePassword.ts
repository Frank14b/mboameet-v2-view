import { proceedChangePassword } from "@/app/services/server-actions";
import {
  ApiResponseDto,
  BooleanResultDto,
  ChangePasswordDto,
} from "@/app/types";
import { changePasswordSchema } from "@/app/validators";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  UseFormHandleSubmit,
} from "react-hook-form";
import useAppForm from "../../useForm";

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
    },
  });

  const [responseData, setResponseData] = useState<ApiResponseDto<
    BooleanResultDto<string>
  > | null>(null);
  const router = useRouter();

  const submitFormData = async (data: ChangePasswordDto) => {
    setIsLoading(true);
    const result = await proceedChangePassword({
      ...data,
      token: token,
    });
    setResponseData(result);
    setIsLoading(false);
    router.push("/");
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
