"use client";

import { defaultProfileImg, formatDate, formatHashTags } from "@/app/lib/utils";
import { FeedCommentItemProps } from "@/app/types";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
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

export default function FeedCommentItemComponent({
  feedId,
  index,
  comment,
  onEditComment,
}: FeedCommentItemProps) {
  //
  const mainContext = useMainContext();
  const userStore = useUserStore();
  const homeContext = useHomeContext();

  return (
    <TimelineItem key={index}>
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
          <>
            <p className="capitalize">{comment.user.userName}</p>
            <p className="text-xs text-gray-600 font-normal">
              <small>{formatDate(comment.createdAt, "ago")}</small>
            </p>
            {comment.user.id == userStore?.user?.id && (
              <span className="absolute right-0 top-0">
                <IconButton
                  onClick={() => {
                    homeContext.editCommentId != comment.id
                      ? homeContext.setEditCommentId(comment.id)
                      : homeContext.setEditCommentId(0);
                  }}
                  placeholder={""}
                  variant="text"
                  className="rounded-xl dark:text-gray-300"
                >
                  <PencilIcon className="h-3 w-3" />
                </IconButton>
              </span>
            )}
          </>
        </Typography>
      </TimelineHeader>
      <TimelineBody className="pb-0 pr-2">
        {homeContext.editCommentId != comment.id ? (
          <div className="font-normal text-sm text-gray-600 dark:text-gray-300">
            <div
              dangerouslySetInnerHTML={{
                __html: formatHashTags(comment.content),
              }}
            ></div>
          </div>
        ) : (
          <FeedCommentFormComponent
            feedId={feedId}
            updateItem={comment}
            onEditComment={onEditComment}
          />
        )}
        <br />
      </TimelineBody>
    </TimelineItem>
  );
}
