"use client";

import { FeedFilesData, FeedHookDto, ResultFeed } from "@/app/types";
import FeedItemComponent from "./feedItemComponent";
import FeedSkeletonComponent from "../../../widgets/skeletons/feedSkeleton";
import { useEffect, useState } from "react";
import useFeedStore from "@/app/store/feedStore";
import {
  getContentEditable,
  handleScrollEvent,
  mainDivComponentId,
  referenceKeyword,
} from "@/app/lib/utils";
import { useAppHubContext } from "@/app/contexts/appHub";
import { useMainContext } from "@/app/contexts/main";
import { motion } from "framer-motion";

//
export default function FeedCardComponent({
  feedHook,
}: {
  feedHook: FeedHookDto;
}) {
  const feedStore = useFeedStore();
  const hubContext = useAppHubContext();
  const mainContext = useMainContext();
  const [feeds, setFeeds] = useState<ResultFeed[] | null>(null);

  useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    const data = await feedHook.fetchFeeds();
    setFeeds(data);
  };

  /** listen new feed event and add into the list */
  useEffect(() => {
    if (feedStore.feed != null) {
      let data = feeds as ResultFeed[];
      setFeeds(null);
      data.unshift(feedStore.feed);

      setTimeout(() => {
        setFeeds(data);
        feedStore.setFeed(null);
      }, 1);
    }
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
  }, []);

  return (
    <>
      <FeedSkeletonComponent isLoading={feedHook.loading} count={5} />

      {!feedHook.loading &&
        feeds &&
        (feeds.length > 0 ? (
          <>
            {feeds.map((feed: ResultFeed, index: number) => (
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                // animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 + index / 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                key={index}
              >
                <div className="w-full mt-3 bg-white dark:bg-black/15 rounded-xl">
                  {feed.feedFiles != null && (
                    <FeedItemComponent
                      feed={feed}
                      fileType={getFileType(feed.feedFiles)}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          <></>
        ))}
    </>
  );
}
