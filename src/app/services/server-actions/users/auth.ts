"use server";

import { ApiResponseDto, LoginFormData } from "@/app/types/index";
import { apiCall } from "../../api";

export const proceedLogin = async (data: LoginFormData): Promise<ApiResponseDto> => {
    try {
        const result = await apiCall({
            method: "POST",
            url: "/users/auth",
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