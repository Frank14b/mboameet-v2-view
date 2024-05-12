import {
  proceedResendOtpCode,
  verifyOtpCode,
} from "@/app/services/server-actions";
import {
  ApiResponseDto,
  BooleanResultDto,
  VerifyOtpCodeDto,
} from "@/app/types";
import { verifyOtpCodeSchema } from "@/app/validators";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../useForm";
import { getLocalStorage } from "@/app/lib/utils";
import { changePasswordPathUrl, localStorageKey } from "@/app/lib/constants/app";
import { notification } from "@/app/lib/notifications";

function useVerifyAuthToken(): VerifyAuthTokenHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [otp, setOtp] = useState<number>(0);
  const [resendTimer, setResendTimer] = useState<boolean>(false);

  const toggleResendTimer = useCallback((status: boolean) => {
    setResendTimer(status);
  }, [setResendTimer]);

  const { handleSubmit } = useAppForm({
    schema: verifyOtpCodeSchema,
    defaultValues: {
      otp: "",
      token: "",
      type: 1,
      accessToken: getLocalStorage(localStorageKey.authToken, true) as string,
    },
  });

  const [responseData, setResponseData] = useState<ApiResponseDto<
    BooleanResultDto<String>
  > | null>(null);
  const router = useRouter();

  const submitFormData = useCallback(
    async (data: VerifyOtpCodeDto) => {
      setIsLoading(true);
      const result = await verifyOtpCode({
        ...data,
        type: 1,
        token: token,
      });

      notification.apiNotify<BooleanResultDto<string>>(result);
      setIsLoading(false);

      if (result.status == true) {
        router.push(`${changePasswordPathUrl}/${result?.data?.data}`);
      }
    },
    [setIsLoading, router, token]
  );

  const resendOtpCode = useCallback(async () => {
    if (resendTimer) return;
    toggleResendTimer(true);
    await proceedResendOtpCode({
      accessToken: getLocalStorage(localStorageKey.authToken, true) as string,
      token: token,
    });
  }, [resendTimer, token, toggleResendTimer]);

  useEffect(() => {
    if (otp) {
      submitFormData({
        otp: otp,
        token: token,
        type: 1,
        accessToken: getLocalStorage(localStorageKey.authToken, true) as string,
      });
    }
  }, [otp, submitFormData, token]);
  //

  const data: VerifyAuthTokenHookDto = {
    isLoading,
    responseData,
    resendTimer,
    toggleResendTimer,
    setOtp,
    setIsLoading,
    handleSubmit,
    submitFormData,
    setToken,
    resendOtpCode,
  };

  return { ...data };
}

export default useVerifyAuthToken;

export interface VerifyAuthTokenHookDto {
  isLoading: boolean;
  responseData: ApiResponseDto<BooleanResultDto<String>> | null;
  resendTimer: boolean;
  toggleResendTimer: (status: boolean) => void;
  resendOtpCode: () => void;
  setOtp: Dispatch<SetStateAction<number>>;
  submitFormData: (data: VerifyOtpCodeDto) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  setToken: Dispatch<SetStateAction<string>>;
}
