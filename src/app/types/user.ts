import { Maybe } from "yup"

export type UpdateProfileFormData = {
    userName?: Maybe<string | undefined>,
    firstName?: Maybe<string | undefined>,
    lastName?: Maybe<string | undefined>,
    email: string,
    phone?: Maybe<number | undefined>,
    countryCode?: Maybe<string | undefined>
}

export type ResultUpdateProfileData = {
    userName?: string,
    firstName?: Maybe<string | undefined>,
    lastName?: Maybe<string | undefined>,
    email: string,
    phone?: Maybe<number | undefined>,
    countryCode?: Maybe<string | undefined>
    createdAt: Date,
    updatedAt: Date,
    age: number,
    lastLogin: Date,
    photo?: string,
}

export type ResultProfileData = ResultUpdateProfileData;

export type ResultUserDto = {
    userName?: string,
    firstName?: Maybe<string | undefined>,
    lastName?: Maybe<string | undefined>,
    email: string,
    phone?: Maybe<number | undefined>,
    countryCode?: Maybe<string | undefined>
    photo?: string,
}