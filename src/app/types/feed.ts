import { Maybe } from "yup";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ApiResponseDto, BooleanResultDto, EmojiSelected, ObjectKeyDto } from ".";

export type FeedFormData = {
  message: string;
};

export type FeedFilesData = {
  id: number;
  type: string;
  previewUrl: string;
  url: string;
};

export type FeedCommentData = {
  id: number;
  content: string;
  user: ResultFeedUserDto;
  createdAt: Date;
  updatedAt: Date;
};

export type ResultFeedUserDto = {
  id: number;
  userName?: string;
  firstName?: Maybe<string | undefined>;
  lastName?: Maybe<string | undefined>;
  email: string;
  photo?: string;
};

export type ResultFeedLikeDto = {
  id: number;
  count: number;
  createdAt: Date;
};

export type ResultFeedCommentDto = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: ResultFeedUserDto;
};

export type ResultFeed = {
  id: number;
  message: string;
  user: ResultFeedUserDto;
  feedFiles: FeedFilesData[] | null;
  feedComments: ResultFeedCommentDto[] | null;
  status: boolean;
  createdAt: Date;
  likes: number;
  views: number;
  comments: number;
  feedLikes: ResultFeedLikeDto[] | null;
};

export interface FeedHookDto {
  isLoading: boolean;
  errors: FieldErrors<any>;
  openFeedForm: boolean;
  openFeedFormImages: boolean;
  updateFeedItem: ResultFeed | null;
  loading: boolean;
  image: string;
  feedInputValue: string;
  linkedImages: ObjectKeyDto[] | null;
  linkedVideos: File[] | null;
  setImage: Dispatch<SetStateAction<string>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  handleOpenFeedFormImages: Dispatch<SetStateAction<boolean>>;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
  deleteItemAsync: ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => Promise<void>;
  fetchFeeds: () => Promise<ResultFeed[] | []>;
  handleGetCursorPosition: () => void;
  uploadProfileImage: (data: string | Blob | ObjectKeyDto) => Promise<void>;
  handleSelectFeedVideo: (e: ChangeEvent<HTMLInputElement>) => void;
  addSelectedEmoji: (data: EmojiSelected) => void;
  removeSelectedImage: (index: number) => void;
  handleSubmitFeed: () => void;
  handleSubmitUpdatedFeed: () => void;
}

export type FeedCommentHookDto = {
  isLoading: boolean;
  errors: FieldErrors<any>;
  openFeedForm: boolean;
  openFeedFormImages: boolean;
  updateFeedItem: ResultFeed | null;
  loading: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  handleOpenFeedFormImages: Dispatch<SetStateAction<boolean>>;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
  likeFeed: ({ itemId }: { itemId: number }) => void;
  desLikeFeed: ({ itemId }: { itemId: number }) => void;
  fetchComments: ({
    itemId,
  }: {
    itemId: number;
  }) => Promise<FeedCommentData[] | null>;
  deleteItemAsync: ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => Promise<void>;
  fetchFeeds: () => Promise<ResultFeed[] | []>;
  editCommentId: number;
  setEditCommentId: Dispatch<SetStateAction<number>>;
  openComment: number;
  setOpenComment: Dispatch<SetStateAction<number>>;
  handleDeleteFeedComment: ({
    feedId,
    id,
  }: {
    feedId: number;
    id: number;
  }) => Promise<BooleanResultDto<any> | null>;
  handleSubmitEditFeedComment: ({
    id,
    feedId,
    formData,
  }: {
    id: number;
    feedId: number;
    formData: FormData;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
  handleSubmitFeedComment({
    feedId,
    formData,
  }: {
    feedId: number;
    formData: FormData;
  }): Promise<ApiResponseDto<ResultFeedCommentDto>>;
};

export type FeedContextDto = {
  isLoading: boolean;
  errors: FieldErrors<any>;
  openFeedForm: boolean;
  openFeedFormImages: boolean;
  updateFeedItem: ResultFeed | null;
  loading: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  handleOpenFeedFormImages: Dispatch<SetStateAction<boolean>>;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
  likeFeed: ({ itemId }: { itemId: number }) => void;
  desLikeFeed: ({ itemId }: { itemId: number }) => void;
  fetchComments: ({
    itemId,
  }: {
    itemId: number;
  }) => Promise<FeedCommentData[] | null>;
  deleteItemAsync: ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => Promise<void>;
  fetchFeeds: () => Promise<ResultFeed[] | []>;
  editCommentId: number;
  setEditCommentId: Dispatch<SetStateAction<number>>;
  openComment: number;
  setOpenComment: Dispatch<SetStateAction<number>>;
  handleDeleteFeedComment: ({
    feedId,
    id,
  }: {
    feedId: number;
    id: number;
  }) => Promise<BooleanResultDto<any> | null>;
  handleSubmitEditFeedComment: ({
    id,
    feedId,
    formData,
  }: {
    id: number;
    feedId: number;
    formData: FormData;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
  handleSubmitFeedComment({
    feedId,
    formData,
  }: {
    feedId: number;
    formData: FormData;
  }): Promise<ApiResponseDto<ResultFeedCommentDto>>;
};
