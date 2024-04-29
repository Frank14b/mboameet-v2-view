import { proceedRegister } from "@/app/services/server-actions";
import {
  ApiResponseDto,
  RegistrationFormData,
  ResultLoginDto,
} from "@/app/types";
import { signUpSchema } from "@/app/validators";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../useForm";
import { notification } from "@/app/lib/notifications";

function useSignUp() {
  //
  const [stepper, setStepper] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useAppForm({
    schema: signUpSchema,
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: null,
      password: "",
      confirmPassword: "",
    },
  });
  //
  const [responseData, setResponseData] =
    useState<ApiResponseDto<ResultLoginDto> | null>(null);

  const submitFormData = useCallback(
    async (data: RegistrationFormData) => {
      if (stepper < 3) return;
      setIsLoading(true);
      const result = await proceedRegister(data);
      
      setIsLoading(false);
      notification.apiNotify<ResultLoginDto>(result);

      if (result.status === true) {
        setStepper(stepper + 1);
      }
    },
    [stepper]
  );

  useEffect(() => {
    if (isLoading) return;
    if (!responseData?.status) return;
    reset();
  }, [isLoading, reset, responseData]);

  const switchStepper = useCallback(() => {
    setTimeout(() => {
      if (stepper === 1) {
        const username = watch("userName");
        const email = watch("email");

        if (
          errors?.userName == undefined &&
          username &&
          errors?.email == undefined &&
          email
        ) {
          setStepper(stepper + 1);
        }
      } else if (stepper === 2) {
        const phone = watch("phone");

        if (errors?.phone == undefined && phone) {
          setStepper(stepper + 1);
        }
      }
    }, 100);
  }, [errors, stepper, setStepper, watch]);

  useEffect(() => {
    switchStepper();
  }, [switchStepper]);

  const switchbackStepper = () => {
    setStepper(stepper - 1);
  };

  const data: SignUpHookDto = {
    open,
    isLoading,
    responseData,
    stepper,
    setOpen,
    setIsLoading,
    handleSubmit,
    submitFormData,
    switchbackStepper,
    setStepper,
  };

  return { ...data };
}

export default useSignUp;

export type SignUpHookDto = {
  open: boolean;
  isLoading: boolean;
  submitFormData: any;
  responseData: ApiResponseDto<ResultLoginDto> | null;
  stepper: number;
  setStepper: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
  switchbackStepper: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
