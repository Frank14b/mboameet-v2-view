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
import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import TooltipCustomAnimation from "../../widgets/tooltipCustomAnimation";

export type MessageProps = {
  id: number;
  message: string;
  type: number;
  date: string;
  sender: number;
  receiver: number;
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
}: {
  users: {
    primaryUser: UserProps;
    secondUser: UserProps;
  };
  messages: MessageProps[];
  onActionClick: Function;
}) {
  return (
    <div className="w-full p-2">
      <Card
        placeholder={""}
        className="shadow-none dark:bg-gray-800 p-1 pt-0 rounded-none border-l-2 dark:border-gray-700"
      >
        <div className="grid grid-cols-2 w-full pt-2 pl-2 pb-2 bg-gray-100 rounded-xl">
          <div className="">
            <Avatar
              placeholder={""}
              size="sm"
              src={users.secondUser.avatar}
              alt={users.secondUser.name}
              withBorder
              className="float-left"
            />
            <Typography placeholder={""} color="blue-gray" className="w-full pt-1 capitalize font-medium">
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

        <Timeline className="h-custom-65 mb-12 mt-1 pt-5 overflow-y-auto">
          {messages.map((message: MessageProps, index: number) => (
            <TimelineItem key={index}>
              <TimelineHeader>
                {message.sender === users.primaryUser.id ? (
                  <>
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="w-full group"
                    >
                      <span className="font-normal text-sm bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-500 rounded-xl p-1 px-4 float-right">
                        {message.message}
                      </span>
                      <span className="absolute invisible group-hover:visible text-gray-600 dark:text-gray-600 text-xs right-14 top-10">
                        {message.date}
                      </span>
                    </Typography>
                    <TimelineIcon className="p-0">
                      <Avatar
                        placeholder={""}
                        size="sm"
                        src={users.primaryUser.avatar}
                        alt={users.primaryUser.name}
                        withBorder
                      />
                    </TimelineIcon>
                  </>
                ) : (
                  <>
                    <TimelineIcon className="p-0 ml-2">
                      <Avatar
                        placeholder={""}
                        size="sm"
                        src={users.secondUser.avatar}
                        alt={users.secondUser.name}
                        withBorder
                      />
                    </TimelineIcon>
                    <Typography
                      placeholder={""}
                      color="blue-gray"
                      className="w-full group"
                    >
                      <span className="font-normal text-sm bg-gray-200 text-gray-600 rounded-xl p-1 px-3 float-left">
                        {message.message}
                      </span>
                      <span className="absolute invisible group-hover:visible text-gray-600 dark:text-gray-600 text-xs left-16 top-10">
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

        <MessageFormComponent />
        {/* // */}
      </Card>
    </div>
  );
}
