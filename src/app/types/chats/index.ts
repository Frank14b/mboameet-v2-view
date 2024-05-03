export type DiscussionTypes = "chats" | "groups";

export interface ResultMessageDto {
  id: number;
  message: string;
  messageType: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
  sender: number;
  receiver: number;
  isReceived: boolean;
  isRead: boolean;
}

export interface ResultChatUsersDto {
  id: number;
  userName: string;
  photo: string;
  senderPhoto: string;
  senderUserName: string;
  unReadCount: number;
  lastMessage: ResultMessageDto;
}
