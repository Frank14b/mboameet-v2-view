"use server";

import { hashingData, setCache } from "@/app/lib/server-utils";
import { ApiResponseDto, LoginFormData, RegistrationFormData, ResultloginDto } from "@/app/types/index";
import { apiCall } from "../../api";

export const proceedLogin = async (data: LoginFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result: ResultloginDto = await apiCall({
            method: "POST",
            url: "/users/auth",
            data,
        });

        const cackeKey: string = hashingData(`token-${result.id}`);
        setCache(cackeKey, result.token);

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