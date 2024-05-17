// chat store
import { create } from "zustand";
import { ResultMessageDto } from "../types/chats";

export type StoreType = {
  message: ResultMessageDto | null;
  loading: boolean;
  createdMessage: ResultMessageDto | null;
  isDiscussionOpen: boolean;
  updatedMessage: ResultMessageDto | null;
  deletedMessage: ResultMessageDto | null; // deleted
  deletedMessages: ResultMessageDto[] | null; // deleted
  setCreatedMessage: (message: ResultMessageDto | null) => void;
  setOpenDiscussion: (status: boolean) => void;
  setUpdatedMessage: (message: ResultMessageDto | null) => void;
  setDeletedMessage: (message: ResultMessageDto | null) => void;
  setDeletedMessages: (messages: ResultMessageDto[] | null) => void;
};

const useChatStore = create<StoreType>()((set, get) => ({
  message: null, // Initial state for user info
  loading: true, // Tracks if feed data is loading
  createdMessage: null,
  isDiscussionOpen: false,
  updatedMessage: null,
  deletedMessage: null,
  deletedMessages: null,
  setLoading: (status: boolean) => set({ loading: status }),
  setOpenDiscussion: (status: boolean) => set({ isDiscussionOpen: status }), //
  setCreatedMessage: (message: ResultMessageDto | null) =>
    set({ createdMessage: message }),
  setUpdatedMessage: (message: ResultMessageDto | null) =>
    set({ updatedMessage: message }),
  setDeletedMessage: (message: ResultMessageDto | null) =>
    set({ deletedMessage: message }),
  setDeletedMessages: (messages: ResultMessageDto[] | null) =>
    set({ deletedMessages: messages }),
}));

export default useChatStore;
