import { HTMLInputTypeAttribute } from "react";
import {
  ApiResponseDto,
  FeedCommentData,
  ObjectKeyDto,
  ResultFeed,
  ResultFeedCommentDto,
} from ".";
import { Size } from "react-easy-crop";

export interface InpputFormComponent {
  title: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  value?: string;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface UserCardComponent {
  image?: string;
  title?: string;
  description?: string;
}

export interface UserCardV2 {
  bgImage: string;
  image: string;
  title: string;
  description?: string;
}

export interface AboutCardComponent {
  title: string;
  icon: any;
  subTitle: string;
}

export interface SideBarMenuList {
  title: string;
  icon: any;
  active?: boolean;
  badge?: string;
  link?: string;
}

export interface SideBarMenuListUser {
  title: string;
  image?: any;
  active?: boolean;
  badge?: string;
}

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

export interface FeedCommentFormProps {
  id?: number;
  feedId: number;
  updateItem?: FeedCommentData;
  onComment?: ({
    formRef,
    feedId,
  }: {
    formRef: string;
    feedId: number;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
  onEditComment?: ({
    formRef,
    feedId,
    id,
  }: {
    formRef: string;
    feedId: number;
    id: number;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
}

export interface FeedCommentItemProps {
  index: number;
  feedId: number;
  comment: FeedCommentData;
  onEditComment?: ({
    formRef,
    feedId,
    id,
  }: {
    formRef: string;
    feedId: number;
    id: number;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>; 
}

export type FeedForm = {
  children: React.ReactNode;
  openFeedForm: boolean;
  updateItem?: ResultFeed | null;
  formFiles: boolean;
};

export type FeedFormFiles = {
  children: React.ReactNode;
  openFeedFiles: boolean;
  cropSize?: Size;
  handleOpenFeedFiles: (value: boolean) => void;
  selectedImageFile: (image: string | Blob | ObjectKeyDto) => void;
};

export interface AlertConfirmationProps {
  title?: string;
  message: string;
  defaultStatus: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}
