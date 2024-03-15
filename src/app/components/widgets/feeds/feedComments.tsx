"use client";

import { FeedCommentData, FeedComments } from "@/app/types";
import {
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function FeedCommentComponent({
  feedData,
  userLiked,
  comments,
  desLikeItem,
  likeItem,
  fetchComments,
}: FeedComments) {
  //
  const [openComment, setOpenComment] = useState<boolean>(false);

  useEffect(() => {
    if (openComment) {
      fetchComments();
    }
  }, [openComment]);

  return (
    <>
      <div className="px-3 pt-2 flex">
        <span className="flex text-gray-600 dark:text-gray-200 text-xs cursor-pointer">
          <EyeIcon className="h-4 w-4" />
          &nbsp;0
        </span>
        <span
          onClick={() => {
            userLiked ? desLikeItem() : likeItem();
          }}
          className={`flex px-6 relative ${
            userLiked
              ? "text-pink-300 dark:text-pink-300"
              : "text-gray-600 dark:text-gray-200"
          } text-xs cursor-pointer`}
        >
          <HeartIcon className="h-4 w-4" />
          &nbsp;Like {feedData.likes}
        </span>
        <span
          onClick={() => setOpenComment(!openComment)}
          className="flex text-gray-600 dark:text-gray-200 text-xs cursor-pointer"
        >
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
          &nbsp;Comment
        </span>
      </div>
      {/* ---- */}
      {openComment && (
        <div className="w-full p-3 mt-3">
          <div className="relative">
            <div
              id="feedFormEditable"
              className="textarea text-gray-800 dark:text-gray-100 p-3 min-h-10 text-sm rounded-xl mb-6 border border-gray-900/30 dark:border-gray-400/30"
              role="textbox"
              contentEditable={true}
              suppressContentEditableWarning={true}
              // onClick={() => handleGetCursorPosition()}
            >
              {" "}
              <>{}</>{" "}
            </div>
            <span className="absolute right-0 bottom-0">
            <IconButton
              onClick={() => {}}
              placeholder={""}
              variant="text"
              className="rounded-xl dark:text-gray-300"
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
            </span>
          </div>
          <Timeline>
            <TimelineItem>
              {/* <TimelineConnector className="border-pink-300"/> */}
              <TimelineHeader>
                <TimelineIcon className="p-0">
                  <Avatar
                    placeholder={""}
                    size="sm"
                    src="https://docs.material-tailwind.com/img/team-1.jpg"
                    alt="user 1"
                    withBorder
                  />
                </TimelineIcon>
                <Typography
                  placeholder={""}
                  variant="h5"
                  color="blue-gray"
                  className="dark:text-white text-sm"
                >
                  Timeline Title Here.
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  placeholder={""}
                  color="gray"
                  className="font-normal text-sm text-gray-600 dark:text-gray-300"
                >
                  The key to more success is to have a lot of pillows. Put it
                  this way, it took me twenty five years to get these plants,
                  twenty five years of blood sweat and tears, and I&apos;m never
                  giving up, I&apos;m just getting started. I&apos;m up to
                  something. Fan luv.
                </Typography>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem>
              {/* <TimelineConnector /> */}
              <TimelineHeader>
                <TimelineIcon className="p-0">
                  <Avatar
                    placeholder={""}
                    size="sm"
                    src="https://docs.material-tailwind.com/img/team-2.jpg"
                    alt="user 2"
                    withBorder
                  />
                </TimelineIcon>
                <Typography
                  placeholder={""}
                  variant="h5"
                  color="blue-gray"
                  className="dark:text-white text-sm"
                >
                  Timeline Title Here.
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  placeholder={""}
                  color="gray"
                  className="font-normal text-sm text-gray-600 dark:text-gray-300"
                >
                  The key to more success is to have a lot of pillows. Put it
                  this way, it took me twenty five years to get these plants,
                  twenty five years of blood sweat and tears, and I&apos;m never
                  giving up, I&apos;m just getting started. I&apos;m up to
                  something. Fan luv.
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </div>
      )}
    </>
  );
}
