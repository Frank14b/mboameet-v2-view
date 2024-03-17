"use client";

import { getContentEditable } from "@/app/lib/utils";
import {
  proceedSubmitEditFeedComment,
  proceedSubmitFeedComment,
} from "@/app/services/server-actions/feeds";
import { FeedCommentData, FeedComments } from "@/app/types";
import {
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Timeline } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import FeedCommentFormComponent from "./feedCommentForm";
import FeedCommentItemComponent from "./feedCommentItem";
import { useHomeContext } from "@/app/template";

export default function FeedCommentComponent({
  feedData,
  userLiked,
  comments,
  desLikeItem,
  likeItem,
  fetchComments,
}: FeedComments) {
  //
  const homeContext = useHomeContext();

  useEffect(() => {
    if (homeContext.openComment != 0) {
      fetchComments();
    }
  }, [homeContext.openComment]);

  // process to feed comment
  const handleSubmitFeedComment = async ({
    feedId,
    formRef,
  }: {
    feedId: number;
    formRef: string;
  }) => {
    const content = getContentEditable(`${formRef}`);

    const formData = new FormData();
    let message = content.innerText;

    if (message.trim().length == 0) {
      return null;
    }
    formData.append("content", message);

    const result = await proceedSubmitFeedComment({
      formData,
      feedId: feedId,
    });
    if (result.status) {
      content.innerHTML = "";
    }
    return result;
  };

  const handleSubmitEditFeedComment = async ({
    id,
    feedId,
    formRef,
  }: {
    id: number;
    feedId: number;
    formRef: string;
  }) => {
    const content = getContentEditable(`${formRef}`);

    const formData = new FormData();
    let message = content.innerText;

    if (message.trim().length == 0) {
      return null;
    }
    formData.append("content", message);

    const result = await proceedSubmitEditFeedComment({
      formData,
      feedId: feedId,
      id: id,
    });
    if (result.status) {
      content.innerHTML = "";
    }
    return result;
  };

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
          onClick={() => {
            homeContext.setEditCommentId(0); 
            homeContext.setOpenComment(feedData.id)
          }}
          className="flex text-gray-600 dark:text-gray-200 text-xs cursor-pointer"
        >
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
          &nbsp;Comment
        </span>
      </div>
      {/* ---- */}
      {homeContext.openComment == feedData.id && (
        <div className="w-full p-3">
          {/* --- form comment --- */}
          {homeContext.editCommentId == 0 && (
            <FeedCommentFormComponent
              feedId={feedData.id}
              onComment={handleSubmitFeedComment}
            />
          )}

          {!comments ? (
            <></>
          ) : (
            <>
              {comments.length > 0 && (
                <Timeline className="mt-5">
                  {comments.map((comment: FeedCommentData, index: number) => (
                    <FeedCommentItemComponent
                      key={index}
                      feedId={feedData.id}
                      index={index}
                      comment={comment}
                      onEditComment={handleSubmitEditFeedComment}
                    />
                  ))}
                </Timeline>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
