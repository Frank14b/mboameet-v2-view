"use client";

import { proceedLogin } from "@/app/services";
import useUserStore from "@/app/store/userStore";
import { ApiResponseDto, LoginFormData, ResultloginDto } from "@/app/types";
import { signInSchema } from "@/app/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";

export default function Template({ children }: { children: React.ReactNode }) {
    //render the page
    return <SignInWrapper>{children}</SignInWrapper>
}

const SignInContext = createContext<any>({});
export function SignInWrapper({ children }: { children: any }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema), // Integrate Yup for validation
    });
    //
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultloginDto> | null>(null)
    const { setUserConnected, setUser, setLoading, userConnected } = useUserStore();
    const router = useRouter();

    const submitFormData = async (data: LoginFormData) => {
        setIsLoading(true);
        const result = await proceedLogin(data);
        setRequestData(result);
        inituserStoreSession(result?.data ?? null);
        setIsLoading(false);

        if (result.status === true) {
            router.push('/')
            setLoading(false);
        };
    }

    const inituserStoreSession = (data: ResultloginDto | null) => {
        setLoading(true);
        setUser(data);
        setUserConnected(true);
    }

    const data: SignInContextDto = {
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
                {!userConnected && children}
            </div>
        </SignInContext.Provider>
    );
}

export const useSignInContext = (): SignInContextDto => useContext(SignInContext);

export type SignInContextDto = {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    register: UseFormRegister<any>,
    handleSubmit: UseFormHandleSubmit<any>,
    errors: FieldErrors<any>,
    submitFormData: any,
    requestData: ApiResponseDto<ResultloginDto> | null
}