"use server";

// import { hashingData, setCache } from "@/app/lib/server-utils";
import {
  ApiResponseDto,
  BooleanResultDto,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginFormData,
  ObjectKeyDto,
  RegistrationFormData,
  ResultForgetPasswordDto,
  ResultProfileData,
  ResultLoginDto,
  VerifyOtpCodeDto,
} from "@/app/types/index";
import { apiCall } from "../../api";
import { setJwtCookie } from "@/app/lib/server-utils";

const basePath = "/users";
const urls = {
  login: `${basePath}/auth`,
  register: `${basePath}`,
  forgetPassword: `${basePath}/forget-password`,
  verifyOtp: `${basePath}/verify-token`,
  resendOtp: `${basePath}/resend-token`,
  changePassword: `${basePath}/change-password`,
  validateToken: `${basePath}/validate-token`,
};

export const proceedLogin = async (
  data: LoginFormData
): Promise<ApiResponseDto<ResultLoginDto>> => {
  const result: ApiResponseDto<ResultLoginDto> = await apiCall({
    method: "POST",
    url: urls.login,
    data,
  });

  if (result?.data != undefined) createUserSession(result.data);

  return result;
};

export const proceedRegister = async (
  data: RegistrationFormData
): Promise<ApiResponseDto<ResultLoginDto>> => {
  const result: ApiResponseDto<ResultLoginDto> = await apiCall({
    method: "POST",
    url: urls.register,
    data,
  });

  return result;
};

export const proceedForgetPassword = async (
  data: ForgetPasswordDto
): Promise<ApiResponseDto<ResultForgetPasswordDto>> => {
  const result: ApiResponseDto<ResultForgetPasswordDto> = await apiCall({
    method: "POST",
    url: urls.forgetPassword,
    data,
  });

  return result;
};

export const verifyOtpCode = async (
  data: VerifyOtpCodeDto
): Promise<ApiResponseDto<BooleanResultDto<string>>> => {
  const result: ApiResponseDto<BooleanResultDto<string>> = await apiCall({
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
    method: "POST",
    url: urls.verifyOtp,
    data,
  });

  return result;
};

export const proceedResendOtpCode = async (data: {
  accessToken: string;
  token: string;
}): Promise<ApiResponseDto<BooleanResultDto<string>>> => {
  const result: ApiResponseDto<BooleanResultDto<string>> = await apiCall({
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
    method: "POST",
    url: urls.resendOtp,
    data,
  });

  return result;
};

export const proceedChangePassword = async (
  data: ChangePasswordDto
): Promise<ApiResponseDto<BooleanResultDto<string>>> => {
  const result: ApiResponseDto<BooleanResultDto<string>> = await apiCall({
    headers: {
      Authorization: "Bearer " + data.accessToken,
    },
    method: "POST",
    url: urls.changePassword,
    data,
  });

  return result;
};

export const validatToken = async () => {
  const result: ApiResponseDto<ResultProfileData> = await apiCall({
    method: "GET",
    url: urls.validateToken,
  });

  return result;
};

export const createUserSession = (user: ResultLoginDto | ObjectKeyDto) => {
  setJwtCookie({ id: user.id, token: user.token });
};
