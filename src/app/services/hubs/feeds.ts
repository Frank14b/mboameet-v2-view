"use client";
import { StoreType } from "@/app/store/feedStore";
import { ResultFeed, ResultFeedCommentDto } from "@/app/types";

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
      (comment: ResultFeedCommentDto) => {
        this._feedStore.setCreatedFeedComment(comment);
      }
    );

    this._connection.on(
      "FeedCommentUpdated",
      (comment: ResultFeedCommentDto) => {
        this._feedStore.setUpdatedFeedComment(comment);
      }
    );

    this._connection.on("FeedCommentDeleted", (commentId: number) => {
      this._feedStore.setDeletedFeedComment(commentId);
    });
  }
}

export default FeedHubs;
