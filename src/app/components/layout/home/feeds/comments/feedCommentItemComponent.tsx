"use client";

import { formatDate, formatHashTags } from "@/app/lib/utils";
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
import { useEffect, useRef } from "react";
import SpeedDialButton from "../../../../widgets/speedDialButton";
import { FeedCommentHookDto } from "@/app/hooks/pages/feeds/comments/useFeedComment";
import {
  defaultProfileImg,
  referenceCommentKeyword,
} from "@/app/lib/constants/app";

export interface FeedCommentItemProps {
  feedId: number;
  comment: FeedCommentData;
  commentHook: FeedCommentHookDto;
}

export default function FeedCommentItemComponent({
  feedId,
  comment,
  commentHook,
}: FeedCommentItemProps) {
  //
  const mainContext = useMainContext();
  const userStore = useUserStore();
  const deleteRef = `${referenceCommentKeyword}-${comment.id}`;
  const itemRef = useRef(null);

  const {
    setEditCommentId,
    editCommentId,
    updatedFeedComment,
    updateSpinner,
    handleEditComment,
    handleDeleteComment,
  } = commentHook;

  useEffect(() => {
    // update current feed comment for all user if in the list on websocket event
    if (updatedFeedComment != null) {
      if (updatedFeedComment.id == comment.id) {
        comment.content = updatedFeedComment.content;
        comment.updatedAt = updatedFeedComment.updatedAt;
      }
    }
  }, [updatedFeedComment, comment]);

  return (
    <TimelineItem id={deleteRef} ref={itemRef}>
      <TimelineHeader>
        <TimelineIcon className="p-0">
          <Avatar
            placeholder={""}
            size="sm"
            src={
              comment.user.photo != null
                ? mainContext.getFileUrl(
                    comment.user.photo,
                    comment.user.id,
                    comment.user.userName
                  )
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
                          editCommentId != comment.id
                            ? setEditCommentId(comment.id)
                            : setEditCommentId(0);
                        }}
                      >
                        <PencilIcon className="h-3 w-3 dark:text-gray-400" />
                      </SpeedDialButton>
                      <SpeedDialButton
                        onClick={() => handleDeleteComment(comment.id)}
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
          editCommentId == comment.id ? "grid" : "flex"
        }"`}
      >
        {editCommentId != comment.id ? (
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

        {editCommentId == comment.id && (
          <>
            {updateSpinner.error.length > 0 && (
              <span className="text-red-600">
                <small>{updateSpinner.error}</small>
              </span>
            )}
            {updateSpinner.status && <Spinner height={15} width={15} />}
          </>
        )}

        <br />
      </div>
    </TimelineItem>
  );
}
