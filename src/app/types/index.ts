import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export * from "./authentication";
export * from "./widget";
export * from "./user";
export * from "./feeds";
export * from './stores/storeTypes';

export type RequestMethod = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

export type ApiResponseDto<T> = {
  status: boolean;
  message: string;
  data?: T;
  statusCode?: number;
};

export type BooleanResultDto<T> = {
  status: boolean;
  message: string;
  data?: Array<T> | object | string | number | undefined | T | ObjectKeyDto;
};

export type ResultPaginate<T> = {
  data: T;
  skip: number;
  limit: number;
  total: number;
  sort: string;
  currentPage: number;
  lastPage: number;
};

export type ObjectKeyDto = { [key: string]: any };

export type EmojiSelected = { emoji: string; emojiUrl: string };

export interface DiscussionTypesDto {
  name: string;
  key: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export interface FriendTypesDto {
  name: "tab_recommend" | "tab_matches";
  key: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export interface FeedTypesListDto {
  name: "tab_recent" | "tab_popular";
  key: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export interface MessageReactionsDto {
  key: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  color: string;
  sort: number;
};

export interface MessageActionsDto {
  key: MessageActionType;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  color: string;
  sort: number;
};

export type MessageActionType = "edit" | "delete";

export type ThemeDto = "dark" | "light"

export type ResultNavBarStatsDto = {
  feeds: number;
  discussions: number;
  friends: number;
  cart: number;
  wallets: number;
}