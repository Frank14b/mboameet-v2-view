"use client";

import { getContentEditable } from "@/app/lib/utils";
import { FeedCommentData, FeedComments } from "@/app/types";
import {
  ChatBubbleBottomCenterTextIcon,
  // EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Timeline } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import FeedCommentFormComponent from "./feedCommentFormComponent";
import FeedCommentItemComponent from "./feedCommentItemComponent";
import { useFeedContext } from "@/app/contexts/pages/feeds";
import useFeedStore from "@/app/store/feedStore";
import { motion } from "framer-motion";

export default function FeedCommentComponent({
  feedData,
  userLiked,
  desLikeItem,
  likeItem,
}: FeedComments) {
  //
  const feedContext = useFeedContext();
  const [comments, setFeedComments] = useState<FeedCommentData[] | null>(null);
  const feedStore = useFeedStore();
  //

  useEffect(() => {
    if (feedContext.openComment == feedData.id) {
      fetchComments();
    }
  }, [feedContext.openComment, feedData.id]);

  const fetchComments = async () => {
    const result = await feedContext.fetchComments({ itemId: feedData.id });
    setFeedComments(result ?? []);
  };

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

    const result = await feedContext.handleSubmitFeedComment({
      formData,
      feedId: feedId,
    });
    if (result.status) {
      content.innerHTML = "";
    }
    return result;
  };

  useEffect(() => {
    if (feedContext.openComment == feedData.id) {
      if (feedStore.createdFeedComment) {
        const data = comments ?? [];
        data.unshift(feedStore.createdFeedComment);
        setFeedComments(data);
        feedStore.setCreatedFeedComment(null);
      }
    }
  }, [feedStore.createdFeedComment, feedContext.openComment, feedData.id]);

  useEffect(() => {
    if (feedContext.openComment == feedData.id) {
      if (feedStore.deletedFeedCommentId && comments != null) {
        const data = comments;
        const index = data.findIndex(
          (comment) => comment.id === feedStore.deletedFeedCommentId
        );
        if (index != -1) {
          setFeedComments(null);
          data.splice(index, 1);
          setFeedComments(data);
          feedStore.setDeletedFeedComment(null);
        }
      }
    }
  }, [feedStore.deletedFeedCommentId, feedContext.openComment, feedData.id]);

  return (
    <>
      <div className="px-3 pt-2 flex">
        {/* <span className="flex text-gray-600 dark:text-gray-300 text-xs cursor-pointer">
          <EyeIcon className="h-4 w-4" />
          &nbsp;0
        </span> */}
        <span
          onClick={() => {
            userLiked ? desLikeItem() : likeItem();
          }}
          className={`flex pr-5 relative ${
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
            feedContext.setEditCommentId(0);
            feedContext.setOpenComment(feedData.id);
          }}
          className="flex text-gray-600 dark:text-gray-300 text-xs cursor-pointer"
        >
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
          &nbsp;Comment {feedData.comments}
        </span>
      </div>
      {/* ---- */}
      {feedContext.openComment == feedData.id && (
        <div className="w-full bg-gray-100 dark:bg-gray-900">
          <div className="p-3 rounded-xl" style={{ width: "90%", float: "right" }}>
            {/* --- form comment --- */}
            {feedContext.editCommentId == 0 && (
              <FeedCommentFormComponent
                feedId={feedData.id}
                onComment={handleSubmitFeedComment}
              />
            )}

            {!comments ? (
              <></>
            ) : (
              comments.length > 0 && (
                <Timeline className="mt-5">
                  {comments.map((comment: FeedCommentData, index: number) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.2 + index / 2 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false }}
                      key={index}
                    >
                      <FeedCommentItemComponent
                        feedId={feedData.id}
                        index={index}
                        comment={comment}
                      />
                    </motion.div>
                  ))}
                </Timeline>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
