import { Maybe } from "yup"

export type UpdateProfileFormData = {
    username?: Maybe<string | undefined>,
    firstname?: Maybe<string | undefined>,
    lastname?: Maybe<string | undefined>,
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