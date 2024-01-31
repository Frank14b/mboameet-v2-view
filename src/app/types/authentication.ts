import { Maybe } from "yup"

export type LoginFormData = {
    username: string,
    password: string
}

export type RegistrationFormData = {
    username: string,
    firstname?: Maybe<string | undefined>,
    lastname?: Maybe<string | undefined>,
    email: string,
    phone?: Maybe<number | undefined>,
    countryCode?: Maybe<string | undefined>,
    password: string
}

export type ResultloginDto = {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: number,
    countryCode: string,
    token: string,
    status: number,
    createdAt: Date,
    updatedAt: Date,
    age: number,
    lastLogin: Date
}

export type ForgetPasswordDto = {
    email: string,
}

export type ResultForgetPasswordDto = {
    token: string,
}
