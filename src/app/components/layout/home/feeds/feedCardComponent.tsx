"use client";

import { useCallback, useMemo, useState } from "react";
import { FeedTypesDto, ResultFeed } from "@/app/types";
import { FeedHookDto } from "@/app/hooks/pages/feeds/useFeed";
import { FeedFormHookDto } from "@/app/hooks/pages/feeds/useFeedForm";
import {
  TabCustomAnimationProps,
  TabsCustomAnimation,
} from "@/app/components/widgets/TabsCustomAnimation";
import FeedSkeleton from "../../../widgets/skeletons/FeedSkeleton";
import AnimateHoverScale from "@/app/components/widgets/motions/AnimateHoverScale";
import { NoDataFound } from "@/app/components/widgets/NoDataFound";
import FeedItemComponent from "./FeedItemComponent";
import { feedTypes } from "@/app/lib/constants/app";

//
export default function FeedCardComponent({
  feedHook,
  feedFormHook,
}: {
  feedHook: FeedHookDto;
  feedFormHook: FeedFormHookDto;
}) {
  //
  const { isLoading, feedTypesList, feeds, setIsLoading, fetchFeeds } =
    feedHook;
  const [activeTab, setActiveTab] = useState<FeedTypesDto>(
    feedTypes.recent.key as FeedTypesDto
  );

  const onTabChange = (tab: string) => {
    setIsLoading(true);
    fetchFeeds({
      type: tab as FeedTypesDto,
    });
    setActiveTab(tab as FeedTypesDto);
  };

  const formattedFeeds = useMemo(() => {
    if (isLoading) return <FeedSkeleton isLoading={true} count={5} />;
    if (!feeds || feeds.length === 0)
      return (
        <NoDataFound
          customClass="dark:shadow-none dark:bg-gray-800"
          message="Feed not found"
        />
      );
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
  }, [feeds, isLoading, feedHook, feedFormHook]);

  const tabMenus = useMemo(() => {
    let result: TabCustomAnimationProps[] = [];

    feedTypesList.map((tab) => {
      result.push({
        label: tab.name.toUpperCase(),
        value: tab.key,
        icon: tab.icon,
        htmlContent: formattedFeeds,
      });
    });

    return result;
  }, [feedTypesList, formattedFeeds]);

  return (
    <div className="mt-4">
      <TabsCustomAnimation
        defaultTab={activeTab}
        onTabChange={onTabChange}
        tabData={tabMenus}
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

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  return (
    <>
      <AnimateHoverScale active={!isExpanded} index={index}>
        <div
          className={`${
            isExpanded
              ? "fixed top-0 left-0 right-0 bottom-0 z-20 p-5 backdrop-blur-sm"
              : "w-full mt-3 bg-white dark:bg-black/15 rounded-xl"
          }`}
        >
          {feed.feedFiles != null && (
            <FeedItemComponent
              feed={feed}
              fileType={getFileType(feed.feedFiles)}
              feedHook={feedHook}
              feedFormHook={feedFormHook}
              isExpanded={isExpanded}
              handleExpand={handleExpand}
            />
          )}
        </div>
      </AnimateHoverScale>
    </>
  );
}
