"use client";

import { Button, Typography } from "@material-tailwind/react";
import FeedFormComponent from "./feedFormComponent";
import FeedCardComponent from "./feedCardComponent";
import useFeedHook from "@/app/hooks/pages/feeds";

export default function FeedComponent() {
  //
  const feedHook = useFeedHook();

  return (
    <>
      <div className="feed-form-container">
        <div className="w-full flex absolute dark:text-white right-0 px-5">
          <div className="w-1/2">
            <Typography placeholder={""} className="font-bold px-1">
              Feeds
              <Button
                onClick={() => {
                  feedHook.handleOpenFeedForm(true);
                }}
                placeholder={""}
                size="sm"
                className="bg-pink-600 mx-3"
              >
                New Feed
              </Button>
            </Typography>
          </div>
          <div className="w-1/2 text-xs flex justify-end pt-1">
            <span className="mx-2 cursor-pointer">Recent</span>
            <span className="mx-2 cursor-pointer font-bold">Friends</span>
            <span className="mx-2 cursor-pointer">Popular</span>
          </div>
        </div>

        <FeedFormComponent
          feedHook={feedHook}
        >
          <></>
        </FeedFormComponent>

        {/*  */}
      </div>

      <div className="mt-12">
        <FeedCardComponent feedHook={feedHook} />
      </div>

      {/*  */}
    </>
  );
}
