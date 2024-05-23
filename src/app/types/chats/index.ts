import { ResultPaginate } from "..";

export type DiscussionTypes = "users" | "groups";

export interface ResultMessageDto {
  id: number;
  message: string;
  messagePair: string;
  messageType: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
  sender: number;
  receiver: number;
  isReceived: boolean;
  isRead: boolean;
  reference: string;
  reaction: string;
  chatFiles: ChatFilesData[];
  isEncrypted: boolean;
}

export interface ResultChatUsersDto {
  id: number;
  userName: string;
  photo: string;
  unReadCount: number;
  lastMessage: ResultMessageDto;
}

export interface ResultMessageByReferenceDto {
  userId: number;
  userName: string;
  photo: string;
  publicKey: string;
  messages: ResultPaginate<ResultMessageDto[]>;
}

export type ChatFilesData = {
  id: number;
  type: string;
  previewUrl: string;
  url: string;
};