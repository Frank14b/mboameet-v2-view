"use server";

// import { hashingData, setCache } from "@/app/lib/server-utils";
import { ApiResponseDto, 
    BooleanResultDto, 
    ChangePasswordDto, 
    ForgetPasswordDto, 
    LoginFormData, 
    ObjectKeyDto, 
    RegistrationFormData, 
    ResultForgetPasswordDto, 
    ResultloginDto, 
    VerifyOtpCodeDto } from "@/app/types/index";
import { ApiErrorMessage, ApiSuccessMessage, apiCall } from "../../api";
import { setJwtCookie } from "@/app/lib/server-utils";

const basePath = "/users";
const urls = {
    login: `${basePath}/auth`,
    register: `${basePath}`,
    forgetPassword: `${basePath}/forget-password`,
    verifyOtp: `${basePath}/verify-token`,
    changePassword: `${basePath}/change-password`,
    validateToken: `${basePath}/validate-token`
}

export const proceedLogin = async (data: LoginFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result: ObjectKeyDto | undefined = await apiCall({
            method: "POST",
            url: urls.login,
            data,
        });

        if(result != undefined) createUserSession(result);

        return ApiSuccessMessage(result);
    } catch (error: any){
        return  ApiErrorMessage(error);
    }
}

export const proceedRegister = async (data: RegistrationFormData): Promise<ApiResponseDto<ResultloginDto>> => {
    try {
        const result: ObjectKeyDto | undefined = await apiCall({
            method: "POST",
            url: urls.register,
            data,
        });
        
        return ApiSuccessMessage(result);
    } catch (error: any){
        return  ApiErrorMessage(error);
    }
}

export const proceedForgetPassword = async (data: ForgetPasswordDto): Promise<ApiResponseDto<ResultForgetPasswordDto>> => {
    try {
        const result: ObjectKeyDto | undefined = await apiCall({
            method: "POST",
            url: urls.forgetPassword,
            data,
        });

        return ApiSuccessMessage(result);
    } catch (error) {
        return  ApiErrorMessage(error)
    }
}

export const verifyOtpCode = async (data: VerifyOtpCodeDto): Promise<ApiResponseDto<BooleanResultDto<string>>> => {
    try {
        const result: ObjectKeyDto | undefined = await apiCall({
            method: "POST",
            url: urls.verifyOtp,
            data,
        });

        return ApiSuccessMessage(result);
    } catch (error) {
        return  ApiErrorMessage(error)
    }
}

export const proceedChangePassword = async (data: ChangePasswordDto): Promise<ApiResponseDto<BooleanResultDto<string>>> => {
    try {
        const result: ObjectKeyDto | undefined = await apiCall({
            method: "POST",
            url: urls.changePassword,
            data,
        });

        return ApiSuccessMessage(result);
    } catch (error) {
        return  ApiErrorMessage(error)
    }
}

export const validatToken = async () => {
    try {
        const result: ObjectKeyDto | undefined = await apiCall({
            method: "GET",
            url: urls.validateToken,
        });

        return ApiSuccessMessage(result);
    } catch (error) {
        return  ApiErrorMessage(error)
    }
}

export const createUserSession = (user: ResultloginDto | ObjectKeyDto) => {
    setJwtCookie({id: user.id, token: user.token});
}