"use client";
import { hubConstants } from "@/app/lib/constants/hubs";
import { StoreType } from "@/app/store/chatStore";
import { ResultMessageDto } from "@/app/types/chats";

class ChatHubs {
  _connection: signalR.HubConnection;
  _chatStore: StoreType;

  constructor(connection: signalR.HubConnection, chatStore: StoreType) {
    // initialize my class
    this._connection = connection;
    this._chatStore = chatStore;
    this.init();
  }

  init(): void {
    this._connection.on(
      hubConstants.chats.messageAdded,
      (message: ResultMessageDto) => {
        this._chatStore.setCreatedMessage(message);
      }
    );

    this._connection.on(
      hubConstants.chats.messageUpdated,
      (message: ResultMessageDto) => {
        this._chatStore.setUpdatedMessage(message);
      }
    );

    this._connection.on(
      hubConstants.chats.messageDeleted,
      (message: ResultMessageDto) => {
        this._chatStore.setDeletedMessage(message);
      }
    );
  }

  updateUserMessagesAsRead = (senderId: number) => {
    if (this._connection) {
      this._connection.invoke(
        hubConstants.chats.updateUserMessagesAsRead,
        senderId
      );
    }
  };
}

export default ChatHubs;
