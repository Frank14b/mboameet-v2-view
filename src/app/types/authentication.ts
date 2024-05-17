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
    password: string,
    confirmPassword: string
}

export type ResultLoginDto = {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    callingCode?: string,
    token: string,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    age: number,
    lastLogin: Date,
    photo?: string,
    country?: Maybe<string | undefined>
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