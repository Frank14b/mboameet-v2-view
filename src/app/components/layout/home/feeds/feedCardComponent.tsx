"use client";

import { FeedTypes, ResultFeed } from "@/app/types";
import FeedItemComponent from "./feedItemComponent";
import FeedSkeleton from "../../../widgets/skeletons/feedSkeleton";
import { motion } from "framer-motion";
import { FeedHookDto } from "@/app/hooks/pages/feeds/useFeed";
import { FeedFormHookDto } from "@/app/hooks/pages/feeds/useFeedForm";
import { TabsCustomAnimation } from "@/app/components/widgets/tabsCustomAnimation";
import { useMemo, useState } from "react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

//
export default function FeedCardComponent({
  feedHook,
  feedFormHook,
}: {
  feedHook: FeedHookDto;
  feedFormHook: FeedFormHookDto;
}) {
  //
  const defaultTab: FeedTypes = "recent";
  const { isLoading, setIsLoading, feeds, fetchFeeds } = feedHook;
  const [activeTab, setActiveTab] = useState<FeedTypes>(defaultTab);

  const onTabChange = (tab: string) => {
    setIsLoading(true);
    fetchFeeds({
      type: tab as FeedTypes,
    });
    setActiveTab(tab as FeedTypes);
  };

  const recentFeedItems = useMemo(() => {
    if (activeTab != "recent") return;
    if (isLoading) return <FeedSkeleton isLoading={true} count={5} />;
    //
    return feeds?.map((feed: ResultFeed, index: number) => (
      <ItemCustomAnimation
        index={index}
        key={index}
        feed={feed}
        feedFormHook={feedFormHook}
        feedHook={feedHook}
      />
    ));
  }, [feeds, activeTab, isLoading, feedHook, feedFormHook]);

  const friendsFeedItems = useMemo(() => {
    if (activeTab != "friends") return;
    if (isLoading) return <FeedSkeleton isLoading={true} count={5} />;
    //
    return feeds?.map((feed: ResultFeed, index: number) => (
      <ItemCustomAnimation
        index={index}
        key={index}
        feed={feed}
        feedFormHook={feedFormHook}
        feedHook={feedHook}
      />
    ));
  }, [feeds, activeTab, isLoading, feedHook, feedFormHook]);

  const popularFeedItems = useMemo(() => {
    if (activeTab != "popular") return;
    if (isLoading) return <FeedSkeleton isLoading={true} count={5} />;
    //
    return feeds?.map((feed: ResultFeed, index: number) => (
      <ItemCustomAnimation
        index={index}
        key={index}
        feed={feed}
        feedFormHook={feedFormHook}
        feedHook={feedHook}
      />
    ));
  }, [feeds, activeTab, isLoading, feedHook, feedFormHook]);

  return (
    <div className="mt-4">
      <TabsCustomAnimation
        defaultTab={defaultTab}
        onTabChange={onTabChange}
        tabData={[
          {
            label: "RECENT",
            value: "recent",
            icon: Square3Stack3DIcon,
            htmlContent: recentFeedItems,
          },
          {
            label: "FRIENDS",
            value: "friends",
            icon: UserCircleIcon,
            htmlContent: friendsFeedItems,
          },
          {
            label: "POPULAR",
            value: "popular",
            icon: Cog6ToothIcon,
            htmlContent: popularFeedItems,
          },
        ]}
      />
    </div>
  );
}

function ItemCustomAnimation({
  index,
  feed,
  feedHook,
  feedFormHook,
}: {
  index: number;
  feed: ResultFeed;
  feedHook: FeedHookDto;
  feedFormHook: FeedFormHookDto;
}) {
  const { getFileType } = feedHook;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.2 + index / 10 }}
        whileHover={{ scale: 1.02 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        key={index}
      >
        <div className="w-full mt-3 bg-white dark:bg-black/15 rounded-xl">
          {feed.feedFiles != null && (
            <FeedItemComponent
              feed={feed}
              fileType={getFileType(feed.feedFiles)}
              feedHook={feedHook}
              feedFormHook={feedFormHook}
            />
          )}
        </div>
      </motion.div>
    </>
  );
}
