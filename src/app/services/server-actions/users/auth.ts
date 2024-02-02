"use server";

import { hashingData, setCache } from "@/app/lib/server-utils";
import { ApiResponseDto, ForgetPasswordDto, LoginFormData, RegistrationFormData, ResultForgetPasswordDto, ResultloginDto } from "@/app/types/index";
import { ApiErrorMessage, ApiSuccessMessage, apiCall } from "../../api";
import { cookies } from 'next/headers'

export const proceedLogin = async (data: LoginFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result: ResultloginDto = await apiCall({
            method: "POST",
            url: "/users/auth",
            data,
        });

        createUserSession(result);

        return ApiSuccessMessage(result);
    } catch (error: any){
        return  ApiErrorMessage(error);
    }
}

export const proceedRegister = async (data: RegistrationFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result = await apiCall({
            method: "POST",
            url: "/users",
            data,
        });
        
        return ApiSuccessMessage(result);
    } catch (error: any){
        return  ApiErrorMessage(error);
    }
}

export const proceedForgetPassword = async (data: ForgetPasswordDto): Promise<ApiResponseDto<ResultForgetPasswordDto>> => {
    try {
        const result = await apiCall({
            method: "POST",
            url: "/users/forget-password",
            data,
        });

        return ApiSuccessMessage(result);
    } catch (error) {
        return  ApiErrorMessage(error)
    }
}

export const createUserSession = (user: ResultloginDto) => {
    cookies().set('sessionId', user.id);
    cookies().set('token', user.token);

    const cackeKey: string = hashingData(`token-${user.id}`);
    setCache(cackeKey, user.token);
}