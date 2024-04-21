"use client";
import { hubConstants } from "@/app/lib/constants/hubs";
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
    this._connection.on(hubConstants.feeds.added, (feed: ResultFeed) => {
      this._feedStore.setFeed(feed);
    });

    this._connection.on(hubConstants.feeds.deleted, (feedId: number) => {
      this._feedStore.setDeletedFeed(feedId);
    });

    this._connection.on(hubConstants.feeds.updated, (feed: ResultFeed) => {
      this._feedStore.setUpdatedFeed(feed);
    });

    this._connection.on(
      hubConstants.feeds.commentCreated,
      (comment: ResultFeedCommentDto) => {
        if (!comment.content) return;
        this._feedStore.setCreatedFeedComment(comment);
      }
    );

    this._connection.on(
      hubConstants.feeds.commentUpdated,
      (comment: ApiResponseDto<ResultFeedCommentDto>) => {
        if (!comment.data) return;
        this._feedStore.setUpdatedFeedComment(comment.data);
      }
    );

    this._connection.on(hubConstants.feeds.commentDeleted, (commentId: number) => {
      this._feedStore.setDeletedFeedComment(commentId);
    });
  }
}

export default FeedHubs;
