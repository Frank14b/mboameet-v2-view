"use client";

import {
  defaultProfileImg,
  formatDate,
  formatHashTags,
  getContentEditable,
  referenceCommentKeyword,
} from "@/app/lib/utils";
import { FeedCommentData } from "@/app/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialContent,
  SpeedDialHandler,
  Spinner,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import FeedCommentFormComponent from "./feedCommentFormComponent";
import { useMainContext } from "@/app/contexts/main";
import useUserStore from "@/app/store/userStore";
import { useFeedContext } from "@/app/contexts/pages/feeds";
import { useEffect, useRef, useState } from "react";
import useFeedStore from "@/app/store/feedStore";
import SpeedDialButton from "../../../../widgets/speedDialButton";

export interface FeedCommentItemProps {
  index: number;
  feedId: number;
  comment: FeedCommentData;
}

export default function FeedCommentItemComponent({
  feedId,
  index,
  comment,
}: FeedCommentItemProps) {
  //
  const mainContext = useMainContext();
  const userStore = useUserStore();
  const feedStore = useFeedStore();
  const feedContext = useFeedContext();
  const deleteRef = `${referenceCommentKeyword}-${comment.id}`;
  const itemRef = useRef(null);
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
    //
    setUpdateSpinner({ status: true, error: "" });
    const content = getContentEditable(`${data.formRef}`);
    const currentContext = comment.content;
    comment.content = content.innerText; // set the current updated content to the comment
    feedContext.setEditCommentId(0); // reset comment edit id

    const formData = new FormData();
    let message = content.innerText;
    if (message.trim().length == 0) {
      return null;
    }
    formData.append("content", message);

    const result = await feedContext.handleSubmitEditFeedComment({
      ...data,
      formData,
    });
    if (result?.status != true) {
      comment.content = currentContext; // revert the previous content if the update failed
      setUpdateSpinner({
        status: false,
        error: result?.message ?? "An error occurred",
      });
      return null;
    }
    content.innerHTML = "";
    setUpdateSpinner({ status: false, error: "" });
    return result;
  };

  const handleDeleteComment = async () => {
    setUpdateSpinner({ status: true, error: "" });
    //
    const result = await feedContext.handleDeleteFeedComment({
      id: comment.id,
      feedId: feedId,
    });
    if (result?.status != true) {
      setUpdateSpinner({
        status: false,
        error: result?.message ?? "An error occurred",
      });
      return;
    }
    setUpdateSpinner({ status: false, error: "" });
    return;
  };

  useEffect(() => {
    // update current feed comment for all user if in the list on websocket event
    if (feedStore.updatedFeedComment != null) {
      if (feedStore.updatedFeedComment.id == comment.id) {
        comment.content = feedStore.updatedFeedComment.content;
        comment.updatedAt = feedStore.updatedFeedComment.updatedAt;
      }
    }
  }, [feedStore.updatedFeedComment, comment]);

  return (
    <TimelineItem key={index} id={deleteRef} ref={itemRef}>
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
                <div className="absolute right-0 top-0">
                  <SpeedDial placement="left">
                    <SpeedDialHandler>
                      <IconButton
                        placeholder={""}
                        style={{ width: "25px", height: "25px" }}
                        size="sm"
                        variant="text"
                        className="rounded-full bg-white-100 text-gray-500 dark:bg-gray-900 dark:text-gray-800"
                      >
                        <PencilIcon className="h-3 w-3 transition-transform group-hover:rotate-45 dark:text-gray-800 dark:hover:text-gray-400" />
                      </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent placeholder={""} className="flex-row">
                      <SpeedDialButton
                        onClick={() => {
                          feedContext.editCommentId != comment.id
                            ? feedContext.setEditCommentId(comment.id)
                            : feedContext.setEditCommentId(0);
                        }}
                      >
                        <PencilIcon className="h-3 w-3 dark:text-gray-400" />
                      </SpeedDialButton>
                      <SpeedDialButton
                        onClick={() => handleDeleteComment()}
                      >
                        <TrashIcon className="h-3 w-3 dark:text-gray-400" />
                      </SpeedDialButton>
                    </SpeedDialContent>
                  </SpeedDial>
                </div>
              )}
          </div>
        </Typography>
      </TimelineHeader>
      <div
        className={`"pb-0 pr-2 pl-12 ${
          feedContext.editCommentId == comment.id ? "grid" : "flex"
        }"`}
      >
        {feedContext.editCommentId != comment.id ? (
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
