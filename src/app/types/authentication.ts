import { Maybe } from "yup"

export type LoginFormData = {
    userName: string,
    password: string
}

export type RegistrationFormData = {
    userName: string,
    firstName?: Maybe<string | undefined>,
    lastName?: Maybe<string | undefined>,
    email: string,
    phone: string,
    country: {
        callingCode: string,
        name: string
    }
    // countryCode?: Maybe<string | undefined>,
    password: string,
    confirmPassword: string
}

export type ResultLoginDto = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    countryCode: string,
    token: string,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    age: number,
    lastLogin: Date,
    photo?: string,
}

export type ForgetPasswordDto = {
    email: string,
}

export type ResultForgetPasswordDto = {
    otpToken: string,
    accessToken: string;
    message: string
}

export type VerifyOtpCodeDto = {
    otp: number,
    token: string,
    type: number,
    accessToken: string,
}

export type ChangePasswordDto = {
    confirmPassword: string,
    password: string,
    token: string,
    accessToken: string,
}