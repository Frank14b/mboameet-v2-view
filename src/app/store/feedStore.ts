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
  setFeed: (feed: ResultFeed) => void;
  setLoading: (newLoading: boolean) => void;
  setDeletedFeed: (id: number) => void;
  setUpdatedFeed: (feed: ResultFeed) => void;
  setDeletedFeedComment: (comment: number) => void;
  setUpdatedFeedComment: (comment: ResultFeedCommentDto) => void;
  setCreatedFeedComment: (comment: ResultFeedCommentDto) => void;
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
  setFeed: (feedData: ResultFeed) => set({ feed: feedData }), // Action to update user info
  setDeletedFeed: (id: number) => set({deletedFeedId: id}),
  setUpdatedFeed: (feed: ResultFeed) => set({updatedFeed: feed}),
  setDeletedFeedComment: (comment: number) => set({deletedFeedCommentId: comment}),
  setUpdatedFeedComment: (comment: ResultFeedCommentDto) => set({updatedFeedComment: comment}),
  setCreatedFeedComment: (comment: ResultFeedCommentDto) => set({createdFeedComment: comment}),
}));

export default useFeedStore;
