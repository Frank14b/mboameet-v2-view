"use client";

import { ConversationHookDto } from "@/app/hooks/pages/chats/useDiscussions";
import {
  messageFieldId,
  messageImageInputFieldId,
} from "@/app/lib/constants/app";
import { createFileUploadString } from "@/app/lib/utils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Badge, IconButton } from "@material-tailwind/react";
import { ChangeEvent } from "react";
import CropImage from "../../widgets/CropImage";
import { ObjectKeyDto } from "@/app/types";
import CustomNextImage from "../../widgets/CustomNextImage";

export function MessageFormComponent({
  userId,
  conversationHook,
}: {
  conversationHook: ConversationHookDto;
  userId: number;
}) {
  //
  const {
    image,
    editedMessage,
    linkedImages,
    setImage,
    handleInputKeyPress,
    cancelEditMessageAction,
    handleSendMessage,
    handleUploadImage,
    removeSelectedImage
  } = conversationHook;

  return (
    <div className="absolute left-0 right-0 bottom-0 z-20">
      <div className="w-full overflow-y-hidden overflow-x-auto flex gap-2 px-5 mb-2">
        {linkedImages?.map((file: ObjectKeyDto, index: number) => (
          <div key={index} className="relative">
            <CustomNextImage
              alt=""
              width={60}
              height={40}
              className="rounded shadow object-center"
              src={file?.base64}
              // style={{ width: "110px", height: "70px" }}
            />
            <div className="absolute bg-gray-900 top-0 left-0 w-full bottom-0 rounded-lg bg-opacity-40"></div>
            <span
              onClick={() => removeSelectedImage(index)}
              className="absolute cursor-pointer right-2 top-2"
            >
              <TrashIcon className="h-4 w-4 text-red-400" />
            </span>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 dark:bg-gray-900 p-2">
        <div className="flex pl-3">
          <label htmlFor={messageImageInputFieldId}>
            <IconButton
              placeholder={""}
              variant="text"
              className="rounded-full dark:text-gray-500"
              onClick={() =>
                document.getElementById(messageImageInputFieldId)?.click()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </IconButton>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage(createFileUploadString(e))
              }
              id={messageImageInputFieldId}
              accept="image/*"
              type="file"
              className="hidden"
            />
          </label>
          <IconButton
            placeholder={""}
            variant="text"
            className="rounded-full dark:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </IconButton>
        </div>
        {editedMessage && (
          <span
            onClick={cancelEditMessageAction}
            className="absolute right-14 cursor-pointer top-0 text-pink-400"
          >
            <Badge
              className="p-1 bg-pink-400 text-xs"
              content={<PlusIcon className="rotate-45" />}
            >
              <></>
            </Badge>
          </span>
        )}

        <div className="w-full">
          <div
            id={`${messageFieldId}`}
            className="textarea text-sm bg-white overflow-y-auto text-gray-800 h-full p-2 w-full max-w-100 rounded-xl border border-gray-900/30 dark:bg-gray-800 dark:text-gray-300"
            role="textbox"
            contentEditable={true}
            suppressContentEditableWarning={true}
            style={{ maxHeight: "55px" }}
            onKeyDown={handleInputKeyPress}
          >
            {" "}
            <>{"@hello"}</>{" "}
          </div>
        </div>

        <div>
          <IconButton
            placeholder={""}
            variant="text"
            className="rounded-full dark:text-gray-500"
            onClick={() =>
              handleSendMessage({
                userId,
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </IconButton>
        </div>
      </div>

      {image.length > 1 && (
        <>
          <CropImage
            image={image}
            croppedImage={handleUploadImage}
            returnType={"object"}
            cropSize={{ width: 500, height: 500 }}
          />
        </>
      )}
    </div>
  );
}
