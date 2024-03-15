"use client";
import { StoreType } from "@/app/store/feedStore";
import { ObjectKeyDto, ResultFeed } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

class FeedHubs {
  _connection: signalR.HubConnection;
  _feedStore: StoreType;

  constructor(
    connection: signalR.HubConnection, 
    feedStore: StoreType
  ) {
    // initialize my class
    this._connection = connection;
    this._feedStore = feedStore;
    this.init();
  }

  init(): void {
    this._connection.on("NewFeedAdded", (feed: ResultFeed) => {
      this._feedStore.setFeed(feed)
    });

    this._connection.on("FeedDeleted", (feedId: number) => {
      this._feedStore.setDeletedFeed(feedId)
    })

    this._connection.on("FeedUpdated", (feed: ResultFeed) => {
      this._feedStore.setUpdatedFeed(feed)
    });
  }
}

export default FeedHubs;
