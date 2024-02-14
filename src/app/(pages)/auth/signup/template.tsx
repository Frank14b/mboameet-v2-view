"use client";

import { proceedRegister } from "@/app/services";
import { ApiResponseDto, RegistrationFormData, ResultloginDto } from "@/app/types";
import { signUpSchema } from "@/app/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";

export default function Template({ children }: { children: React.ReactNode }) {
    return <SignUpWrapper>{children}</SignUpWrapper>
}

const SignUpContext = createContext<any>({});
export function SignUpWrapper({ children }: { children: any }) {

    const [stepper, setStepper] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema), // Integrate Yup for validation
    });
    //
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultloginDto> | null>(null)

    const submitFormData = async (data: RegistrationFormData) => {
        if (stepper < 2) return;
        setIsLoading(true);
        const result = await proceedRegister(data);
        setIsLoading(false);
        setRequestData(result);

        if (result.status === true) {
            setStepper(stepper + 1);
        }
    }

    useEffect(() => {
        switchSepper()
    }, [errors])

    useEffect(() => {
        if (isLoading) return;
        reset();
    }, [isLoading])

    const switchSepper = () => {
        setTimeout(() => {
            if (stepper === 0) {
                const username = watch("username");
                const email = watch("email");

                if (errors?.username == undefined &&
                    username &&
                    errors?.email == undefined &&
                    email
                ) {
                    setStepper(stepper + 1);
                }
            } else if (stepper === 1) {
                const phone = watch("phone");

                if (errors?.phone == undefined &&
                    phone
                ) {
                    setStepper(stepper + 1);
                }
            }
        }, 100);
    }

    const switchbackStepper = () => {
        setStepper(stepper - 1);
    }

    const data: SignUpContextDto = {
        open,
        setOpen,
        isLoading,
        setIsLoading,
        register,
        handleSubmit,
        errors,
        submitFormData,
        requestData,
        switchbackStepper,
        stepper,
        setStepper
    };

    return (
        <SignUpContext.Provider value={data}>
            <div
                className={``}
            >
                {children}
            </div>
        </SignUpContext.Provider>
    );
}

export const useSignUpContext = (): SignUpContextDto => useContext(SignUpContext);

export type SignUpContextDto = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    register: UseFormRegister<any>,
    handleSubmit: UseFormHandleSubmit<any>,
    errors: FieldErrors<any>,
    submitFormData: any,
    requestData: ApiResponseDto<ResultloginDto> | null,
    switchbackStepper: () => void,
    stepper: number,
    setStepper: Dispatch<SetStateAction<number>>
}