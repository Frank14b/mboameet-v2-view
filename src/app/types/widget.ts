import {
  Dispatch,
  HTMLInputTypeAttribute,
  MutableRefObject,
  SetStateAction,
} from "react";
import { FeedCommentData, ObjectKeyDto, ResultFeed } from ".";
import { Size } from "react-easy-crop";

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

export type FeedItem = {
  data: ResultFeed;
  fileType?: "caroussel" | "images" | "video" | "image";
};

export type FeedItemMenuAction = {
  feedData: ResultFeed;
  onShare: () => void;
  onActionEdit: () => void;
  deleteItem: () => void;
};

export type FeedComments = {
  feedData: ResultFeed;
  userLiked: boolean;
  comments: FeedCommentData[] | null;
  desLikeItem: () => void;
  likeItem: () => void;
  fetchComments: () => void;
};

export type FeedForm = {
  children: React.ReactNode;
  openFeedForm: boolean;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  formFiles: boolean;
  openFormFiles: Dispatch<SetStateAction<boolean>>;
  updateItem?: ResultFeed | null;
};

export type FeedFormFiles = {
  children: React.ReactNode;
  openFeedFiles: boolean;
  handleOpenFeedFiles: (value: boolean) => void;
  selectedImageFile: (image: string | Blob | ObjectKeyDto) => void;
  cropSize?: Size;
};
