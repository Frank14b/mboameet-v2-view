"use client";

import { FeedFilesData, ResultFeed } from "@/app/types";
import FeedItemsComponent from "../../widgets/feeds/feedItems";
import FeedSkeletonComponent from "../../skeletons/feedSkeleton";
import { useEffect } from "react";
import useFeedStore from "@/app/store/feedStore";
import {
  getContentEditable,
  handleScrollEvent,
  mainDivComponentId,
  referenceCommentKeyword,
  referenceKeyword,
} from "@/app/lib/utils";
import { useFeedContext } from "@/app/contexts/pages/feeds";
import { useAppHubContext } from "@/app/contexts/appHub";
import { useMainContext } from "@/app/contexts/main";

//
export default function FeedComponent() {
  const feedStore = useFeedStore();
  const feedContext = useFeedContext();
  const hubContext = useAppHubContext();
  const mainContext = useMainContext();

  useEffect(() => {
    feedContext.fetchFeeds();
  }, [feedStore.feed, hubContext.connection]);

  useEffect(() => {
    if (feedStore.deletedFeedId != null) {
      getContentEditable(
        `${referenceKeyword}-${feedStore.deletedFeedId}`
      )?.remove();
    }
  }, [feedStore.deletedFeedId]);

  const getFileType = (files: FeedFilesData[]) => {
    if (files.length > 2) return "carousel";
    if (files.length == 1) {
      if (files[0].url.includes(".mp4")) return "video";
      return "image";
    }
    return "images";
  };

  useEffect(() => {
    handleScrollEvent({
      elementId: mainDivComponentId,
      callback: mainContext.setMainScroll,
    });
  }, [])

  return (
    <>
      <FeedSkeletonComponent isLoading={feedContext.loading} count={5} />

      {!feedContext.loading &&
        (feedContext.feeds.length > 0 ? (
          <>
            {feedContext.feeds.map((feed: ResultFeed, index: number) => (
              <div
                className="w-full mt-3 bg-white dark:bg-black/15 rounded-xl"
                key={index}
              >
                {feed.feedFiles != null && (
                  <FeedItemsComponent
                    feed={feed}
                    fileType={getFileType(feed.feedFiles)}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <></>
        ))}
    </>
  );
}
