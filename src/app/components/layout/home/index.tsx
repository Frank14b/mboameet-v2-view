"use client";

import { IconButton, Typography } from "@material-tailwind/react";
import FeedFormCardComponent from "../../widgets/feedFormCard";
import FeedComponent from "./feedComponent";
import { useHomeContext } from "@/app/template";

export default function HomePageComponent() {
  //
  const homeContext = useHomeContext();

  return (
    <>
      <div className="feed-form-container">
        <div className="w-full flex absolute dark:text-white right-0 px-5">
          <div className="w-1/2">
            <Typography placeholder={""} className="font-bold px-1">
              Feeds
            </Typography>
          </div>
          <div className="w-1/2 text-xs flex justify-end pt-1">
            <span className="mx-2 cursor-pointer">Recents</span>
            <span className="mx-2 cursor-pointer font-bold">Friends</span>
            <span className="mx-2 cursor-pointer">Popular</span>
          </div>
        </div>

        <FeedFormCardComponent
          openFeedForm={homeContext.openFeedForm}
          handleOpenFeedForm={homeContext.handleOpenFeedForm}
          formFiles={homeContext.openFeedFormImages}
          openFormFiles={homeContext.handleOpenFeedFormImages}
          updateItem={homeContext.updateFeedItem}
        >
          <></>
        </FeedFormCardComponent>

        {/*  */}
        <div className="w-full px-3 mt-12 bg-white dark:bg-black/15 rounded-xl p-3  border border-gray-200 dark:border-gray-800">
          <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
            <div className="flex">
              <IconButton
                placeholder={""}
                variant="text"
                className="rounded-full dark:text-gray-300"
                onClick={() => homeContext.handleOpenFeedFormImages(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="w-full"></div>
            <div>
              <IconButton
                onClick={() => homeContext.handleOpenFeedForm(true)}
                placeholder={""}
                variant="text"
                className="rounded-full dark:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <FeedComponent />

      {/*  */}
    </>
  );
}
