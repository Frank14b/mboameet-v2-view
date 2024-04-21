"use client";

import {
  clickFileUpload,
  createFileUploadString,
  feedFormEditable,
  feedInputFile,
  feedInputVideoFile,
  feedVideoPreviewId
} from "@/app/lib/utils";
import {
  FeedHookDto,
  ObjectKeyDto,
} from "@/app/types";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { ChangeEvent } from "react";
import EmojiPickerButton from "../../../commons/emojiPickerButton";
import {
  PhotoIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import CropProfileImage from "../../profile/cropProfileImage";

export default function FeedFormComponent({
  children,
  feedHook,
}: {
  children: React.ReactNode;
  feedHook: FeedHookDto;
}) {
  //

  return (
    <>
      <Dialog
        placeholder={""}
        open={feedHook.openFeedForm}
        handler={feedHook.handleOpenFeedForm}
        dismiss={{
          escapeKey: false,
          outsidePress: false,
        }}
      >
        <Card
          placeholder={""}
          className="mx-auto w-full max-w-[54rem] dark:bg-gray-600"
        >
          <div className="flex items-center justify-between">
            <DialogHeader
              placeholder={""}
              className="flex flex-col items-start"
            >
              {" "}
              <Typography placeholder={""} className="mb-1" variant="h4">
                @New_Feed{" "}
              </Typography>
            </DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5 cursor-pointer"
              onClick={() => feedHook.handleOpenFeedForm(false)}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <DialogBody placeholder={""}>
            <Typography
              placeholder={""}
              className="mb-10 -mt-7 "
              color="gray"
              variant="lead"
            >
              Write the message and then click button.
            </Typography>
            <div className="grid gap-6 max-h-96 overflow-y-auto overflow-x-hidden w-full mx-w-full">
              <div className="w-full emoji-container">
                <EmojiPickerButton selected={feedHook.addSelectedEmoji}>
                  <></>
                </EmojiPickerButton>
              </div>

              <div
                id={`${feedFormEditable}`}
                className="textarea text-gray-800 p-3 min-h-40 rounded-xl border border-gray-900/30"
                role="textbox"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onClick={() => feedHook.handleGetCursorPosition()}
              >
                {" "}
                <>{feedHook.feedInputValue}</>{" "}
              </div>
            </div>
            {/* // */}
            {!feedHook.updateFeedItem && feedHook.linkedImages && feedHook.linkedImages?.length > 0 && (
              <div className="w-full overflow-y-hidden overflow-x-auto flex gap-2 pt-5">
                {feedHook.linkedImages.map((image: ObjectKeyDto, index: number) => (
                  <div key={index} className="relative">
                    <img
                      className="rounded shadow object-center"
                      src={image?.base64}
                      style={{ width: "110px", height: "70px" }}
                    />
                    <div className="absolute bg-gray-900 top-0 left-0 w-full bottom-0 rounded-lg bg-opacity-40"></div>
                    <span
                      onClick={() => feedHook.removeSelectedImage(index)}
                      className="absolute cursor-pointer right-2 top-2"
                    >
                      <TrashIcon className="h-4 w-4 text-red-400" />
                    </span>
                  </div>
                ))}
              </div>
            )}
            {!feedHook.updateFeedItem && feedHook.linkedVideos && feedHook.linkedVideos?.length > 0 && (
              <div className="pt-6">
                <video
                  id={feedVideoPreviewId}
                  controls
                  className="h-15 w-full rounded-xl"
                ></video>
              </div>
            )}
          </DialogBody>
          <DialogFooter placeholder={""} className="space-x-2">
            {!feedHook.updateFeedItem && (
              <>
                {!feedHook.linkedImages && (
                  <Button
                    placeholder={""}
                    variant="text"
                    color="gray"
                    onClick={() => clickFileUpload(feedInputVideoFile)}
                  >
                    <VideoCameraIcon width={20} height={20} />
                  </Button>
                )}

                {!feedHook.linkedVideos && (
                  <Button
                    placeholder={""}
                    variant="text"
                    color="gray"
                    onClick={() => clickFileUpload(feedInputFile)}
                  >
                    <PhotoIcon width={20} height={20} />
                  </Button>
                )}

                <Button
                  placeholder={""}
                  variant="gradient"
                  color="gray"
                  onClick={() => feedHook.handleSubmitFeed()}
                >
                  Post Now
                </Button>
              </>
            )}

            {feedHook.updateFeedItem && (
              <>
                <Button
                  placeholder={""}
                  variant="gradient"
                  color="gray"
                  onClick={() => feedHook.handleSubmitUpdatedFeed()}
                >
                  Update Now
                </Button>
              </>
            )}
          </DialogFooter>
        </Card>
      </Dialog>

      {!feedHook.updateFeedItem && (
        <>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              feedHook.setImage(createFileUploadString(e))
            }
            id={feedInputFile}
            accept="image/*"
            type="file"
            className="hidden"
          />
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              feedHook.handleSelectFeedVideo(e)
            }
            id={feedInputVideoFile}
            accept="video/*"
            type="file"
            className="hidden"
          />

          {feedHook.image.length > 1 && (
            <>
              <CropProfileImage
                image={feedHook.image}
                croppedImage={feedHook.uploadProfileImage}
                returnType={"object"}
                cropSize={{ width: 700, height: 360 }}
              />
            </>
          )}
        </>
      )}

      {children}
    </>
  );
}
