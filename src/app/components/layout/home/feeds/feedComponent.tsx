"use client";

import { Button, Typography } from "@material-tailwind/react";
import FeedFormComponent from "./feedFormComponent";
import FeedCardComponent from "./feedCardComponent";
import useFeedForm from "@/app/hooks/pages/feeds/useFeedForm";
import useFeed from "@/app/hooks/pages/feeds/useFeed";

export default function FeedComponent() {
  // custom hooks
  const feedFormHook = useFeedForm();
  const feedHook = useFeed();
  const { handleOpenFeedForm } = feedFormHook;

  return (
    <>
      <div className="feed-form-container">
        <div className="w-full flex absolute dark:text-white right-0 px-5">
          <div className="w-1/2 px-5">
            <Typography placeholder={""} className="font-bold px-1">
              Feeds
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
