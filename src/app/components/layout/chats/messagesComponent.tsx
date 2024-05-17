"use client";

import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Avatar,
  Card,
} from "@material-tailwind/react";
import { MessageFormComponent } from "./messageFormComponent";
import {
  CheckBadgeIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import TooltipCustomAnimation from "../../widgets/tooltipCustomAnimation";
import { messagesContentId } from "@/app/lib/constants/app";
import { ConversationHookDto } from "@/app/hooks/pages/chats/useDiscussions";
import ConversationReactionComponent from "./conversationReactionComponent";
import MessageActionsComponent from "./messageActionsComponent";
import Image from "next/image";
import { MessageImagePreviewComponent } from "./messageImagePreviewComponent";
import { useState } from "react";

export function MessagesComponent({
  users,
  messages,
  onActionClick,
  conversationHook,
}: {
  users: {
    primaryUser: UserProps;
    secondUser: UserProps;
  };
  messages: MessageProps[];
  onActionClick: Function;
  conversationHook: ConversationHookDto;
}) {
  //

  const [openImage, setOpenImage] = useState<boolean>(false);
  const {
    editedMessage,
    chatImages,
    handleMessageReaction,
    handleMessageAction,
  } = conversationHook;

  return (
    <div className="w-full p-2 dark:backdrop-blur-sm backdrop-grayscale rounded-xl">
      <Card
        placeholder={""}
        className="shadow-none bg-transparent rounded-lg p-1 pt-0"
      >
        <div className="grid grid-cols-2 w-full pt-2 px-5 pb-2 bg-gray-100 dark:bg-gray-900 rounded-xl">
          <div className="relative">
            <Avatar
              placeholder={""}
              size="sm"
              src={users.secondUser.avatar}
              alt={users.secondUser.name}
              withBorder
              className="float-left"
            />

            <div className="h-2 w-2 left-5 bottom-0 rounded-full bg-green-700 absolute"></div>

            <Typography
              placeholder={""}
              color="blue-gray"
              className="w-full pt-1 capitalize font-medium dark:text-gray-300 dark:font-bold"
            >
              &nbsp;&nbsp; {users.secondUser.name}
            </Typography>
          </div>
          <div className="relative dark:text-gray-400">
            <a href="#">
              <TooltipCustomAnimation content="Audio Call">
                <PhoneIcon className="h-5 w-5 absolute right-14 top-2" />
              </TooltipCustomAnimation>
            </a>
            <a href="#">
              <TooltipCustomAnimation content="Video Call">
                <VideoCameraIcon className="h-5 w-5 absolute right-2 top-2" />
              </TooltipCustomAnimation>
            </a>
          </div>
        </div>

        <Timeline
          className="h-custom-80 mb-14 mt-1 pt-5 px-3 overflow-y-auto"
          id={messagesContentId}
        >
          {messages.map((message: MessageProps, index: number) => (
            <TimelineItem key={index} className={`${message?.customClass}`}>
              <TimelineHeader
                className={` group ${
                  message.messageGroup.length > 0 || message.files.length > 0
                    ? "items-start"
                    : ""
                }`}
              >
                {message.sender === users.primaryUser.id ? (
                  <>
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="w-full relative"
                    >
                      <span
                        className={`font-normal ${
                          editedMessage?.id === message.id
                            ? "border-2 border-pink-300"
                            : ""
                        } ${
                          message.messageGroup.length > 0
                            ? "rounded-xl"
                            : "rounded-xl"
                        } max-w-96 text-sm bg-gray-800 dark:bg-gray-800 text-gray-200 dark:text-gray-100 p-2 px-4 float-right shadow-md`}
                      >
                        <span>{message.message}</span>

                        {message.messageGroup.map(
                          (subMessage, subIndex) =>
                            subMessage.message?.length > 0 && (
                              <span key={subIndex} className="pt-5">
                                <br />
                                {subMessage.message}
                              </span>
                            )
                        )}

                        {message.files.length > 0 && (
                          <span
                            className={`mt-2 grid ${
                              message.files.length > 2
                                ? "grid-cols-3"
                                : message.files.length == 1
                                ? "grid-cols-1"
                                : "grid-cols-2"
                            } gap-2`}
                          >
                            {message.files.map((file, index) => (
                              <Image
                                onClick={() => setOpenImage(true)}
                                key={index}
                                src={file.url}
                                alt={""}
                                height={150}
                                width={170}
                                className="rounded-xl blur-sm hover:blur-0 border cursor-pointer border-gray-600 shadow-lg p-1"
                              />
                            ))}
                          </span>
                        )}

                        {message.isRead && (
                          <span className="">
                            <CheckBadgeIcon className="h-3 w-3 text-pink-200 absolute right-0" />
                          </span>
                        )}
                      </span>
                    </Typography>
                    <TimelineIcon className="p-0 h-9">
                      <></>
                      <Avatar
                        placeholder={""}
                        size="sm"
                        src={users.primaryUser.avatar}
                        alt={users.primaryUser.name}
                        // withBorder
                      />
                    </TimelineIcon>
                    {/* // */}
                    <div className="hidden absolute right-0 group-hover:block z-20">
                      <MessageActionsComponent
                        item={message}
                        onActionClick={handleMessageAction}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <TimelineIcon className="p-0 ml-2 h-9">
                      <></>
                      <Avatar
                        placeholder={""}
                        size="sm"
                        src={users.secondUser.avatar}
                        alt={users.secondUser.name}
                        // withBorder
                      />
                    </TimelineIcon>
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="w-full relative"
                    >
                      <span
                        className={`font-normal ${
                          message.messageGroup.length > 0
                            ? "rounded-xl"
                            : "rounded-xl"
                        } max-w-96 text-sm bg-white dark:bg-gray-400 text-gray-600 dark:text-gray-900 p-2 px-3 float-left shadow-md`}
                      >
                        <span>{message.message}</span>

                        {message.messageGroup.map(
                          (subMessage, subIndex) =>
                            subMessage.message?.length > 0 && (
                              <span key={subIndex} className="pt-5">
                                <br />
                                {subMessage.message}
                              </span>
                            )
                        )}

                        {message.files.length > 0 && (
                          <span className="mt-2 flex gap-2 overflow-x-auto">
                            {message.files.map((file, index) => (
                              <Image
                                onClick={() => setOpenImage(true)}
                                key={index}
                                src={file.url}
                                alt={""}
                                height={150}
                                width={170}
                                className="rounded-xl blur-sm hover:blur-0 border cursor-pointer border-gray-300 shadow-lg p-1"
                              />
                            ))}
                          </span>
                        )}
                      </span>
                    </Typography>

                    <ConversationReactionComponent
                      onReactionClick={handleMessageReaction}
                      itemId={message.id}
                      active={message.reaction}
                    />
                  </>
                )}

                <span className="absolute left-0 right-0 bottom-5 grid place-items-center invisible group-hover:visible text-gray-600 dark:text-gray-600 text-xs">
                  {message.date}
                </span>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <></>
              </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>

        <MessageImagePreviewComponent
          active={chatImages?.[0]}
          images={chatImages}
          open={openImage}
          onOpen={setOpenImage}
        />

        <MessageFormComponent
          userId={users.secondUser.id}
          conversationHook={conversationHook}
        />
        {/* // */}
      </Card>
    </div>
  );
}

export type MessageProps = {
  id: number;
  message: string;
  type: number;
  date: string;
  sender: number;
  receiver: number;
  isSameUserAsPrevious: boolean;
  customClass?: string;
  messageGroup: { id: number; message: string; isLastMessage: boolean }[];
  isRead: boolean;
  reaction: string;
  files: {
    id: number;
    type: string;
    previewUrl: string;
    url: string;
  }[];
  isEncrypted: boolean;
};

export type UserProps = {
  id: number;
  name: string;
  avatar: string;
};
