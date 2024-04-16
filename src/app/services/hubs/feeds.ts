"use client";
import { StoreType } from "@/app/store/feedStore";
import { ApiResponseDto, ResultFeed, ResultFeedCommentDto } from "@/app/types";

class FeedHubs {
  _connection: signalR.HubConnection;
  _feedStore: StoreType;

  constructor(connection: signalR.HubConnection, feedStore: StoreType) {
    // initialize my class
    this._connection = connection;
    this._feedStore = feedStore;
    this.init();
  }

  init(): void {
    this._connection.on("NewFeedAdded", (feed: ResultFeed) => {
      this._feedStore.setFeed(feed);
    });

    this._connection.on("FeedDeleted", (feedId: number) => {
      this._feedStore.setDeletedFeed(feedId);
    });

    this._connection.on("FeedUpdated", (feed: ResultFeed) => {
      this._feedStore.setUpdatedFeed(feed);
    });

    this._connection.on(
      "FeedCommentCreated",
      (comment: ApiResponseDto<ResultFeedCommentDto>) => {
        if(!comment.data) return;
        this._feedStore.setCreatedFeedComment(comment.data);
      }
    );

    this._connection.on(
      "FeedCommentUpdated",
      (comment: ApiResponseDto<ResultFeedCommentDto>) => {
        if(!comment.data) return;
        this._feedStore.setUpdatedFeedComment(comment.data);
      }
    );

    this._connection.on("FeedCommentDeleted", (commentId: number) => {
      this._feedStore.setDeletedFeedComment(commentId);
    });
  }
}

export default FeedHubs;
