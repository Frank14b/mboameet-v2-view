// user store
import { create } from 'zustand';
import { ResultFeed } from '../types';

export type StoreType = {
  feed: ResultFeed | null;
  loading: boolean;
  deletedFeedId: number | null;
  updatedFeed: ResultFeed | null,
  setFeed: (feed: ResultFeed) => void;
  setLoading: (newLoading: boolean) => void;
  setDeletedFeed: (id: number) => void;
  setUpdatedFeed: (feed: ResultFeed) => void;
}

const useFeedStore = create<StoreType>()((set, get) => ({
  feed:  null, // Initial state for user info
  loading: true, // Tracks if feed data is loading
  deletedFeedId: null,
  updatedFeed: null,
  setLoading: (status: boolean) => set({loading: status}),
  setFeed: (feedData: ResultFeed) => set({ feed: feedData }), // Action to update user info
  setDeletedFeed: (id: number) => set({deletedFeedId: id}),
  setUpdatedFeed: (feed: ResultFeed) => set({updatedFeed: feed})
}));

export default useFeedStore;
