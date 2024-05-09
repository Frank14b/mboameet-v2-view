// chat store
import { create } from "zustand";
import { ResultMessageDto } from "../types/chats";

export type StoreType = {
  message: ResultMessageDto | null;
  loading: boolean;
  createdMessage: ResultMessageDto | null;
  isDiscussionOpen: boolean;
  setCreatedMessage: (message: ResultMessageDto | null) => void;
  setOpenDiscussion: (status: boolean) => void;
};

const useChatStore = create<StoreType>()((set, get) => ({
  message: null, // Initial state for user info
  loading: true, // Tracks if feed data is loading
  createdMessage: null,
  isDiscussionOpen: false,
  setLoading: (status: boolean) => set({ loading: status }),
  setOpenDiscussion: (status: boolean) => set({ isDiscussionOpen: status}), //
  setCreatedMessage: (message: ResultMessageDto | null) =>
    set({ createdMessage: message }),
}));

export default useChatStore;
