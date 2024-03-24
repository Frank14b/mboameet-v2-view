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
import { useHomeContext } from "@/app/template";
import { useAppHubContext } from "@/app/contexts/appHub";
import { useMainContext } from "@/app/contexts/main";

//
export default function FeedComponent() {
  const feedStore = useFeedStore();
  const homeContext = useHomeContext();
  const hubContext = useAppHubContext();
  const mainContext = useMainContext();

  useEffect(() => {
    homeContext.fetchFeeds();
  }, [feedStore.feed, hubContext.connection]);

  useEffect(() => {
    if (feedStore.deletedFeedId != null) {
      getContentEditable(
        `${referenceKeyword}-${feedStore.deletedFeedId}`
      )?.remove();
    }
  }, [feedStore.deletedFeedId]);

  useEffect(() => {
    if (feedStore.deletedFeedCommentId != null) {
      getContentEditable(
        `${referenceCommentKeyword}-${feedStore.deletedFeedCommentId}`
      )?.remove();
    }
  }, [feedStore.deletedFeedCommentId]);

  const getFileType = (files: FeedFilesData[]) => {
    if (files.length > 2) return "caroussel";
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
      <FeedSkeletonComponent isLoading={homeContext.loading} count={5} />

      {!homeContext.loading &&
        (homeContext.feeds.length > 0 ? (
          <>
            {homeContext.feeds.map((feed: ResultFeed, index: number) => (
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
