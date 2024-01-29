"use server";

import { hashingData, setCache } from "@/app/lib/server-utils";
import { ApiResponseDto, LoginFormData, RegistrationFormData, ResultloginDto } from "@/app/types/index";
import { apiCall } from "../../api";
import { cookies } from 'next/headers'

export const proceedLogin = async (data: LoginFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result: ResultloginDto = await apiCall({
            method: "POST",
            url: "/users/auth",
            data,
        });

        createUserSession(result);

        return {
            status: true,
            message: "Success",
            data: result
        };
    } catch (error: any){
        return {
            status: false,
            message: error.response.data?.title ?? error.response.data,
            data: error.response.data?.errors
        };
    }
}

export const proceedRegister = async (data: RegistrationFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result = await apiCall({
            method: "POST",
            url: "/users",
            data,
        });
        
        return {
            status: true,
            message: "Success",
            data: result
        };
    } catch (error: any){
        return {
            status: false,
            message: error.response.data?.title ?? error.response.data,
            data: error.response.data?.errors
        };
    }
}

export const createUserSession = (user: ResultloginDto) => {
    cookies().set('sessionId', user.id);
    cookies().set('token', user.token);

    const cackeKey: string = hashingData(`token-${user.id}`);
    setCache(cackeKey, user.token);
}