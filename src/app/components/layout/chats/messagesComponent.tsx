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
import { useEffect } from "react";
import { scrollToBottom } from "@/app/lib/utils";
import { messagesContentId } from "@/app/lib/constants/app";
import { ConversationHookDto } from "@/app/hooks/pages/chats/useDiscussions";

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
};

export type UserProps = {
  id: number;
  name: string;
  avatar: string;
};

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
  useEffect(() => {
    scrollToBottom(`${messagesContentId}`);
  }, [messages]);

  return (
    <div className="w-full p-2">
      <Card
        placeholder={""}
        className="shadow-none dark:bg-gray-800 p-1 pt-0 rounded-none"
      >
        <div className="grid grid-cols-2 w-full pt-2 px-5 pb-2 bg-gray-100 dark:bg-gray-900 rounded-xl">
          <div className="">
            <Avatar
              placeholder={""}
              size="sm"
              src={users.secondUser.avatar}
              alt={users.secondUser.name}
              withBorder
              className="float-left"
            />
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
                className={` ${
                  message.messageGroup.length > 0 ? "items-start" : ""
                }`}
              >
                {message.sender === users.primaryUser.id ? (
                  <>
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="w-full group"
                    >
                      <span
                        className={`font-normal ${
                          message.messageGroup.length > 0
                            ? "rounded-xl"
                            : "rounded-xl"
                        } text-right max-w-96 text-sm bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-400 p-2 px-4 float-right shadow-md`}
                      >
                        <span>{message.message}</span>

                        {message.messageGroup.map((subMessage, subIndex) => (
                          <span key={subIndex} className="pt-6">
                            <br />
                            {subMessage.message}
                          </span>
                        ))}

                        <span className="absolute invisible group-hover:visible text-gray-600 dark:text-gray-600 text-xs right-14 bottom-5">
                          {message.date}
                        </span>

                        {message.isRead && (
                          <span className="">
                            <CheckBadgeIcon className="h-5 w-5" />
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
                      className="w-full group"
                    >
                      <span
                        className={`font-normal ${
                          message.messageGroup.length > 0
                            ? "rounded-xl"
                            : "rounded-xl"
                        } max-w-96 text-sm bg-gray-200 dark:bg-gray-500 text-gray-600 dark:text-gray-900 p-2 px-3 float-left`}
                      >
                        <span>{message.message}</span>

                        {message.messageGroup.map((subMessage, subIndex) => (
                          <span key={subIndex} className="pt-5">
                            <br />
                            {subMessage.message}
                          </span>
                        ))}
                      </span>
                      <span className="absolute invisible group-hover:visible text-gray-600 dark:text-gray-600 text-xs left-16 bottom-5">
                        {message.date}
                      </span>
                    </Typography>
                  </>
                )}
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <></>
              </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>

        <MessageFormComponent
          userId={users.secondUser.id}
          conversationHook={conversationHook}
        />
        {/* // */}
      </Card>
    </div>
  );
}
