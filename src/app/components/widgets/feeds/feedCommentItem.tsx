"use client";

import {
  defaultProfileImg,
  formatDate,
  formatHashTags,
  getContentEditable,
  referenceCommentKeyword,
} from "@/app/lib/utils";
import { FeedCommentItemProps } from "@/app/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
  Spinner,
  TimelineBody,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import FeedCommentFormComponent from "./feedCommentForm";
import { useMainContext } from "@/app/contexts/main";
import useUserStore from "@/app/store/userStore";
import { useHomeContext } from "@/app/template";
import { useEffect, useState } from "react";
import useFeedStore from "@/app/store/feedStore";

export default function FeedCommentItemComponent({
  feedId,
  index,
  comment,
  onEditComment,
  onDeleteComment,
}: FeedCommentItemProps) {
  //
  const mainContext = useMainContext();
  const userStore = useUserStore();
  const feedStore = useFeedStore();
  const homeContext = useHomeContext();
  const deleteRef = `${referenceCommentKeyword}-${comment.id}`;

  const [updateSpinner, setUpdateSpinner] = useState<{
    status: boolean;
    error: string;
  }>({
    status: false,
    error: "",
  });

  const handleEditComment = async (data: {
    formRef: string;
    feedId: number;
    id: number;
  }) => {
    setUpdateSpinner({ status: true, error: "" });

    const content = getContentEditable(`${data.formRef}`);
    const currentContext = comment.content;
    comment.content = content.innerText; // set the current updated content to the comment
    homeContext.setEditCommentId(0); // reset comment edit id

    const result = await onEditComment?.(data);
    if (result?.status != true) {
      comment.content = currentContext; // revert the previous content if the update failed
      setUpdateSpinner({
        status: false,
        error: result?.message ?? "An error occcured",
      });
      return null;
    }

    setUpdateSpinner({ status: false, error: "" });
    return result;
  };

  const handleDeleteComment = async () => {
    setUpdateSpinner({ status: true, error: "" });

    const content = getContentEditable(`${deleteRef}`);

    const result = await onDeleteComment?.({ 
      id: comment.id,
      feedId: feedId,
    });
    if (result?.status != true) {
      setUpdateSpinner({
        status: false,
        error: result?.message ?? "An error occcured",
      });
      return null;
    }

    content.remove(); // revert the previous content if the update faile
    return result;
  };

  useEffect(() => {
    // update current feed comment for all user if in the list on websocket event
    if (feedStore.updatedFeedComment != null) {
      if (feedStore.updatedFeedComment.id == comment.id) {
        comment.content = feedStore.updatedFeedComment.content;
        comment.updatedAt = feedStore.updatedFeedComment.updatedAt;
      }
    }
  }, [feedStore.updatedFeedComment]);

  return (
    <TimelineItem key={index} id={deleteRef}>
      {/* <TimelineConnector className="border-pink-300"/> */}
      <TimelineHeader>
        <TimelineIcon className="p-0">
          <Avatar
            placeholder={""}
            size="sm"
            src={
              comment.user.photo != null
                ? mainContext.getFileUrl(comment.user.photo, comment.user.id)
                : defaultProfileImg
            }
            alt={comment.user.userName}
            withBorder={false}
          />
        </TimelineIcon>
        <Typography
          placeholder={""}
          variant="h5"
          color="blue-gray"
          className="dark:text-white text-sm w-full relative"
        >
          <div style={{ marginLeft: "-4px" }}>
            <p className="capitalize">{comment.user.userName}</p>
            <p className="text-xs text-gray-600 font-normal">
              <small>{formatDate(comment.createdAt, "ago")}</small>
            </p>
            {comment.user.id == userStore?.user?.id &&
              updateSpinner.status == false && (
                <span className="absolute right-0 top-0">
                  <IconButton
                    onClick={() => {
                      homeContext.editCommentId != comment.id
                        ? homeContext.setEditCommentId(comment.id)
                        : homeContext.setEditCommentId(0);
                    }}
                    placeholder={""}
                    variant="text"
                    className="rounded-xl dark:text-gray-300 mr-2"
                  >
                    <PencilIcon className="h-3 w-3" />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      handleDeleteComment();
                    }}
                    placeholder={""}
                    variant="text"
                    className="rounded-xl dark:text-gray-300"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </IconButton>
                </span>
              )}
          </div>
        </Typography>
      </TimelineHeader>
      <div
        className={`"pb-0 pr-2 pl-12 ${
          homeContext.editCommentId == comment.id ? "grid" : "flex"
        }"`}
      >
        {homeContext.editCommentId != comment.id ? (
          <div className="font-normal text-sm text-gray-600 dark:text-gray-300">
            <div
              dangerouslySetInnerHTML={{
                __html: formatHashTags(comment.content),
              }}
            ></div>
          </div>
        ) : (
          <div className="w-full">
            <FeedCommentFormComponent
              feedId={feedId}
              updateItem={comment}
              onEditComment={handleEditComment}
            />
          </div>
        )}
        {updateSpinner.error.length > 0 && (
          <span className="text-red-600">
            <small>{updateSpinner.error}</small>
          </span>
        )}
        {updateSpinner.status && <Spinner height={15} width={15} />}
        <br />
      </div>
    </TimelineItem>
  );
}
