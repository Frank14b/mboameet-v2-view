"use client";

import { FeedCommentData, FeedComments } from "@/app/types";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Timeline } from "@material-tailwind/react";
import FeedCommentFormComponent from "./feedCommentFormComponent";
import FeedCommentItemComponent from "./feedCommentItemComponent";
import useFeedComment from "@/app/hooks/pages/feeds/comments/useFeedComment";
import { useCallback } from "react";
import AnimateHoverScale from "@/app/components/widgets/motions/animateHoverScale";

export default function FeedCommentComponent({
  feedData,
  userLiked,
  handleReaction,
}: FeedComments) {
  //
  const commentHook = useFeedComment(feedData.id);
  const {
    comments,
    openComment,
    editCommentId,
    handleSubmitFeedComment,
    setEditCommentId,
    setOpenComment,
  } = commentHook;

  const toggleComments = useCallback(() => {
    if (openComment == 0) {
      setEditCommentId(0);
      setOpenComment(feedData.id);
    } else {
      setEditCommentId(0);
      setOpenComment(0);
    }
  }, [openComment, feedData.id, setEditCommentId, setOpenComment]);

  return (
    <>
      <div className="px-3 pt-2 flex">
        <span
          onClick={() => handleReaction()}
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
          onClick={() => toggleComments()}
          className="flex text-gray-600 dark:text-gray-300 text-xs cursor-pointer"
        >
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
          &nbsp;Comment {feedData.comments}
        </span>
      </div>
      {/* ---- */}
      {openComment == feedData.id && (
        <div className="w-full bg-gray-100 dark:bg-gray-900">
          <div
            className="p-3 rounded-xl"
            style={{ width: "90%", float: "right" }}
          >
            {/* --- form comment --- */}
            {editCommentId == 0 && (
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
                    <AnimateHoverScale index={index} key={index}>
                      <FeedCommentItemComponent
                        feedId={feedData.id}
                        comment={comment}
                        commentHook={commentHook}
                      />
                    </AnimateHoverScale>
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
