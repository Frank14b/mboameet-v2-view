class FeedHubs {
  
  connection: signalR.HubConnection;
  newFeedId: number | null;
  deletedFeedId: number | null;

  constructor(
    connection: signalR.HubConnection,
  ) {
    // initialize my class
    this.connection = connection;
    this.newFeedId = null;
    this.deletedFeedId = null;
    this.init();
  }

  get newFeed () {
    return this.newFeedId;
  }

  set newFeed(feed: number | null) {
    this.newFeedId = feed;
  }

  get deletedFeed () {
    return this.deletedFeedId;
  }

  set deletedFeed (feed: number | null) {
    this.deletedFeedId = feed;
  }

  init(): void {
    this.connection.on("NewFeedAdded", (feedId: number) => {
        this.newFeedId = feedId;
    });
    
    this.connection.on("FeedDeleted", (feedId: number) => {
        this.deletedFeedId = feedId;
    });
  };

}

export default FeedHubs;
