"use client";

import { Button, Typography } from "@material-tailwind/react";
import FeedFormComponent from "./FeedFormComponent";
import FeedCardComponent from "./FeedCardComponent";
import useFeedForm from "@/app/hooks/pages/feeds/useFeedForm";
import useFeed from "@/app/hooks/pages/feeds/useFeed";
import { HomeModernIcon } from "@heroicons/react/24/solid";

export default function FeedComponent() {
  // custom hooks
  const feedFormHook = useFeedForm();
  const feedHook = useFeed();
  const { handleOpenFeedForm } = feedFormHook;

  return (
    <>
      <div className="feed-form-container">
        <div className="w-full flex absolute dark:text-white right-0 px-4">
          <div className="w-full px-0">
            <Typography placeholder={""} className="font-bold justify-between flex px-1">
              <span className="flex gap-2"><HomeModernIcon className="h-4 w-4 mt-[4px]" /> Feeds</span>
              <Button
                onClick={() => {
                  handleOpenFeedForm(true);
                }}
                placeholder={""}
                size="sm"
                className="bg-pink-600 mx-3"
              >
                New Feed
              </Button>
            </Typography>
          </div>
        </div>

        <FeedFormComponent feedFormHook={feedFormHook}>
          <></>
        </FeedFormComponent>
      </div>

      <div className="mt-12">
        <FeedCardComponent feedHook={feedHook} feedFormHook={feedFormHook} />
      </div>
    </>
  );
}
