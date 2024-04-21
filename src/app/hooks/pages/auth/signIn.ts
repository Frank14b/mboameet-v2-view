import { proceedLogin } from "@/app/services/server-actions";
import useUserStore from "@/app/store/userStore";
import { ApiResponseDto, LoginFormData, ResultLoginDto } from "@/app/types";
import { signInSchema } from "@/app/validators";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../useForm";

function useSignIn(): SignInHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit } = useAppForm({
    schema: signInSchema,
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const [responseData, setResponseData] =
    useState<ApiResponseDto<ResultLoginDto> | null>(null);
  const { setUserConnected, setUser, setLoading } = useUserStore();
  const router = useRouter();

  const submitFormData = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      const result = await proceedLogin(data);
      setResponseData(result);
      setIsLoading(false);

      if (result.status === true) {
        initUserStoreSession(result?.data ?? null);
        router.push("/");
        setLoading(false);
      }
    },
    [proceedLogin]
  );

  const initUserStoreSession = (data: ResultLoginDto | null) => {
    setLoading(true);
    setUser(data);
    setUserConnected(true);
  };
  //

  const data: SignInHookDto = {
    isLoading,
    responseData,
    setIsLoading,
    handleSubmit,
    submitFormData,
  };

  return { ...data };
}

export default useSignIn;

export type SignInHookDto = {
  isLoading: boolean;
  submitFormData: any;
  responseData: ApiResponseDto<ResultLoginDto> | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
};
