import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { ObjectKeyDto } from ".";

export type InpputFormComponent = {
  title: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string | number;
  placeholder?: string;
};

export type UserCardComponent = {
  image?: string;
  title?: string;
  description?: string;
};

export type UserCardV2 = {
  bgImage: string;
  image: string;
  title: string;
  description?: string;
};

export type AboutCardComponent = {
  title: string;
  icon: any;
  subTitle: string;
};

export type SideBarMenuList = {
  title: string;
  icon: any;
  active?: boolean;
  badge?: string;
  link?: string;
};

export type SideBarMenuListUser = {
  title: string;
  image?: any;
  active?: boolean;
  badge?: string;
};

export type FeedNews = {
  title: string;
  icon: any;
  subTitle: string;
  fileType?: string;
};

export type FeedForm = {
  children: React.ReactNode;
  openFeedForm: boolean;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  formFiles: boolean;
  openFormFiles: Dispatch<SetStateAction<boolean>>;
};

export type FeedFormFiles = {
  children: React.ReactNode;
  openFeedFiles: boolean;
  handleOpenFeedFiles: (value: boolean) => void;
  selectedImageFile: (image: string | Blob | ObjectKeyDto) => void;
};
