"use client";

import { Button, Typography } from "@material-tailwind/react";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import useFeedForm from "@/app/hooks/pages/feeds/useFeedForm";
import useFeed from "@/app/hooks/pages/feeds/useFeed";
import FeedFormComponent from "@/app/components/layout/home/feeds/FeedFormComponent";
import FeedCardComponent from "@/app/components/layout/home/feeds/FeedCardComponent";
import { useScopedI18n } from "@/app/locales/client";

export default function Home() {
  //
  const feedFormHook = useFeedForm();
  const feedHook = useFeed();
  const { handleOpenFeedForm } = feedFormHook;

  const scopedT = useScopedI18n('home');

  return (
    <>
      <div className="feed-form-container">
        <div className="flex dark:text-white pl-4">
          <div className="w-full px-0">
            <Typography
              placeholder={""}
              className="font-bold justify-between flex px-1"
            >
              <span className="flex gap-2">
                <HomeModernIcon className="h-4 w-4 mt-[4px]" /> Feeds
              </span>
              <Button
                onClick={() => {
                  handleOpenFeedForm(true);
                }}
                placeholder={""}
                size="sm"
                className="bg-pink-600 mx-3"
              >
                {scopedT("feeds.new_feed_btn")}
              </Button>
            </Typography>
          </div>
        </div>
        <FeedFormComponent feedFormHook={feedFormHook}>
          <></>
        </FeedFormComponent>
      </div>

      <div className="mt-5">
        <FeedCardComponent feedHook={feedHook} feedFormHook={feedFormHook} />
      </div>
    </>
  );
}
