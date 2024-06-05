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
  feedId: number;
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
  feedId: number;
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

export type FeedTypesDto = "recent" | "friends" | "popular";
