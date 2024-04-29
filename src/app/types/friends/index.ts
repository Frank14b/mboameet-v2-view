import { Maybe } from "yup";

export type ResultFriendsDto = {
  id: number;
  userName: string;
  firstName?: Maybe<string | undefined>;
  lastName?: Maybe<string | undefined>;
  email: string;
  photo?: string;
  fullName?: string;
  match: any[];
  likes: number;
  views: number;
  createdAt: Date;
};

export type FriendsTypes = "recommended" | "matches";