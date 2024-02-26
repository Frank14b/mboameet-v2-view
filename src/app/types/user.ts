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
    username?: string,
    firstname?: Maybe<string | undefined>,
    lastname?: Maybe<string | undefined>,
    email: string,
    phone?: Maybe<number | undefined>,
    countryCode?: Maybe<string | undefined>
}

export type ResultProfileData = ResultUpdateProfileData;