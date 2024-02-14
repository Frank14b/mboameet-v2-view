"use client";

import { proceedLogin } from "@/app/services";
import { ApiResponseDto, LoginFormData, ResultloginDto } from "@/app/types";
import { signInSchema } from "@/app/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";

export default function Template({ children }: { children: React.ReactNode }) {
    //render the page
    return <SignInWrapper>{children}</SignInWrapper>
}

const SignInContext = createContext<any>({});
export function SignInWrapper({ children }: { children: any }) {

    const [openLogin, setOpenLogin] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema), // Integrate Yup for validation
    });
    //
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultloginDto> | null>(null)

    const submitFormData = async (data: LoginFormData) => {
        setIsLoading(true);
        const result = await proceedLogin(data);
        setRequestData(result);
        setIsLoading(false);

        if (result.status === true) setOpenLogin(false);
    }

    const data: SignInContextDto = {
        openLogin,
        setOpenLogin,
        isLoading,
        setIsLoading,
        register,
        handleSubmit,
        errors,
        submitFormData,
        requestData,
    };

    return (
        <SignInContext.Provider value={data}>
            <div
                className={``}
            >
                {children}
            </div>
        </SignInContext.Provider>
    );
}

export const useSignInContext = (): SignInContextDto => useContext(SignInContext);

export type SignInContextDto = {
    openLogin: boolean,
    setOpenLogin: Dispatch<SetStateAction<boolean>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    register: UseFormRegister<any>,
    handleSubmit: UseFormHandleSubmit<any>,
    errors: FieldErrors<any>,
    submitFormData: any,
    requestData: ApiResponseDto<ResultloginDto> | null
}