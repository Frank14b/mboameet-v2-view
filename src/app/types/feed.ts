import { Maybe } from "yup";

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
  url: string;
  createdAt: Date;
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
  id: string;
  count: number;
  createdAt: Date;
};

export type ResultFeedCommentDto = {
  id: string;
  content: number;
  createdAt: Date;
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
  feedLikes: ResultFeedLikeDto[] | null;
};
