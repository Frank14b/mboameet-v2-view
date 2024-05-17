import { Maybe } from "yup";

export type UpdateProfileFormData = {
  userName?: Maybe<string | undefined>;
  firstName?: Maybe<string | undefined>;
  lastName?: Maybe<string | undefined>;
  email: string;
  phone?: Maybe<number | undefined>;
  callingCode?: Maybe<string | undefined>;
  country?: Maybe<string | undefined>;
};

export type ResultUpdateProfileData = {
  id: number;
  userName?: string;
  firstName?: Maybe<string | undefined>;
  lastName?: Maybe<string | undefined>;
  email: string;
  phone?: Maybe<number | undefined>;
  callingCode?: Maybe<string | undefined>;
  createdAt: Date;
  updatedAt: Date;
  age: number;
  lastLogin: Date;
  photo?: string;
  country?: Maybe<string | undefined>;
};

export type ResultProfileData = ResultUpdateProfileData;

export type ResultUserDto = {
  userName?: string;
  firstName?: Maybe<string | undefined>;
  lastName?: Maybe<string | undefined>;
  email: string;
  phone?: Maybe<number | undefined>;
  callingCode?: Maybe<string | undefined>;
  photo?: string;
  country?: Maybe<string | undefined>;
};

export type ResultAccountSettingDto = {
  id: number;
  isVisible: boolean;
  autoApproveMatch: boolean;
  preferredLanguage: string;
  restrictedCountries: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountSettingsFormData = {
  isVisible?: boolean;
  autoApproveMatch?: boolean;
  preferredLanguage?: string;
  restrictedCountries?: string;
};

export type AccountSettingProps = {
  id: number;
  isVisible: boolean;
  autoApproveMatch: boolean;
  preferredLanguage: string;
  restrictedCountries: string;
};
