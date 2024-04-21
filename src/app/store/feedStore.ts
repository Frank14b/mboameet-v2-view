// user store
import { create } from 'zustand';
import { ResultFeed, ResultFeedCommentDto } from '../types';

export type StoreType = {
  feed: ResultFeed | null;
  loading: boolean;
  deletedFeedId: number | null;
  updatedFeed: ResultFeed | null,
  deletedFeedCommentId: number | null;
  updatedFeedComment: ResultFeedCommentDto | null;
  createdFeedComment: ResultFeedCommentDto | null;
  setFeed: (feed: ResultFeed | null) => void;
  setLoading: (newLoading: boolean) => void;
  setDeletedFeed: (id: number | null) => void;
  setUpdatedFeed: (feed: ResultFeed | null) => void;
  setDeletedFeedComment: (comment: number | null) => void;
  setUpdatedFeedComment: (comment: ResultFeedCommentDto | null) => void;
  setCreatedFeedComment: (comment: ResultFeedCommentDto | null) => void;
}

const useFeedStore = create<StoreType>()((set, get) => ({
  feed:  null, // Initial state for user info
  loading: true, // Tracks if feed data is loading
  deletedFeedId: null,
  updatedFeed: null,
  deletedFeedCommentId: null,
  updatedFeedComment: null,
  createdFeedComment: null,
  setLoading: (status: boolean) => set({loading: status}),
  setFeed: (feedData: ResultFeed | null) => set({ feed: feedData }), // Action to update user info
  setDeletedFeed: (id: number | null) => set({deletedFeedId: id}),
  setUpdatedFeed: (feed: ResultFeed | null) => set({updatedFeed: feed}),
  setDeletedFeedComment: (comment: number | null) => set({deletedFeedCommentId: comment}),
  setUpdatedFeedComment: (comment: ResultFeedCommentDto | null) => set({updatedFeedComment: comment}),
  setCreatedFeedComment: (comment: ResultFeedCommentDto | null) => set({createdFeedComment: comment}),
}));

export default useFeedStore;
