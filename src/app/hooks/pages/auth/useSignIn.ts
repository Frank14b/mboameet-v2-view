import { proceedLogin } from "@/app/services/server-actions";
import useUserStore from "@/app/store/userStore";
import { ApiResponseDto, LoginFormData, ResultLoginDto } from "@/app/types";
import { signInSchema } from "@/app/validators";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../useForm";
import { notification } from "@/app/lib/notifications";
import { useMainContext } from "@/app/contexts/main";

function useSignIn(): SignInHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getFileUrl } = useMainContext();

  const { handleSubmit } = useAppForm({
    schema: signInSchema,
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const [responseData] = useState<ApiResponseDto<ResultLoginDto> | null>(null);
  const { setUserConnected, setUser, setLoading } = useUserStore();
  const router = useRouter();

  const initUserStoreSession = useCallback(
    (data: ResultLoginDto | null) => {
      setLoading(true);
      setUser({
        ...data,
        photo: getFileUrl(data?.photo, data?.id),
      });
      setUserConnected(true);
    },
    [setUserConnected, setUser, setLoading, getFileUrl]
  );

  const submitFormData = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      const result = await proceedLogin(data);

      notification.apiNotify<ResultLoginDto>(result);
      setIsLoading(false);

      if (result.status === true) {
        initUserStoreSession(result?.data ?? null);
        // router.push("/");
        window.location.reload();
      }
    },
    [initUserStoreSession]
  );
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
