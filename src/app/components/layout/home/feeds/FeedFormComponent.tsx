"use client";

import React from "react";
import { feedFormEditable, feedVideoPreviewId } from "@/app/lib/constants/app";
import { ObjectKeyDto } from "@/app/types";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import {
  PhotoIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { FeedFormHookDto } from "@/app/hooks/pages/feeds/useFeedForm";
import FeedFileInputComponent from "./files/FeedFileInputComponent";
import { clickFileUploadWithRef } from "@/app/lib/utils";
import EmojiPickerButton from "../../../widgets/EmojiPickerButton";
import { useScopedI18n } from "@/app/locales/client";

export default function FeedFormComponent({
  children,
  feedFormHook,
}: {
  children: React.ReactNode;
  feedFormHook: FeedFormHookDto;
}) {
  //
  const {
    openFeedForm,
    linkedImages,
    updateFeedItem,
    feedInputValue,
    linkedVideos,
    inputFileImageRef,
    inputFileVideoRef,
    feedFormEditableRef,
    removeSelectedImage,
    handleGetCursorPosition,
    handleOpenFeedForm,
    addSelectedEmoji,
    handleSubmitFeed,
    handleSubmitUpdatedFeed,
  } = feedFormHook;

  const scopedT = useScopedI18n("home.feeds");

  return (
    <>
      <Dialog
        placeholder={""}
        open={openFeedForm}
        handler={handleOpenFeedForm}
        dismiss={{
          escapeKey: false,
          outsidePress: false,
        }}
      >
        <Card placeholder={""} className="mx-auto w-full max-w-[54rem]">
          <div className="flex items-center justify-between">
            <DialogHeader
              placeholder={""}
              className="flex flex-col items-start"
            >
              {" "}
              <Typography placeholder={""} className="mb-1" variant="h4">
                {scopedT("popup.add_form.title")}{" "}
              </Typography>
            </DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5 cursor-pointer"
              onClick={() => handleOpenFeedForm(false)}
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
              {scopedT("popup.add_form.subtitle")}
            </Typography>
            <div className="grid gap-6 max-h-96 overflow-y-auto overflow-x-hidden w-full mx-w-full">
              <div className="w-full emoji-container">
                <EmojiPickerButton selected={addSelectedEmoji}>
                  <></>
                </EmojiPickerButton>
              </div>

              <div
                id={`${feedFormEditable}`}
                ref={feedFormEditableRef}
                className="textarea text-gray-800 p-3 min-h-40 rounded-xl border border-gray-900/30"
                role="textbox"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onClick={() => handleGetCursorPosition()}
              >
                {" "}
                <>{feedInputValue}</>{" "}
              </div>
            </div>
            {/* // */}
            {!updateFeedItem && linkedImages && linkedImages?.length > 0 && (
              <div className="w-full overflow-y-hidden overflow-x-auto flex gap-2 pt-5">
                {linkedImages.map((image: ObjectKeyDto, index: number) => (
                  <div key={index} className="relative">
                    <Image
                      alt=""
                      width={110}
                      height={70}
                      className="rounded shadow object-center"
                      src={image?.base64}
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
            )}
            {!updateFeedItem && linkedVideos && linkedVideos?.length > 0 && (
              <div className="pt-6">
                <video
                  id={feedVideoPreviewId}
                  controls
                  className="h-15 w-full rounded-xl"
                ></video>
              </div>
            )}
          </DialogBody>
          <DialogFooter placeholder={""} className="space-x-2 justify-between">
            {!updateFeedItem && (
              <>
                <div>
                  {!linkedImages && (
                    <Button
                      placeholder={""}
                      variant="text"
                      color="gray"
                      onClick={() => clickFileUploadWithRef(inputFileVideoRef)}
                    >
                      <VideoCameraIcon width={20} height={20} />
                    </Button>
                  )}

                  {!linkedVideos && (
                    <Button
                      placeholder={""}
                      variant="text"
                      color="gray"
                      onClick={() => clickFileUploadWithRef(inputFileImageRef)}
                    >
                      <PhotoIcon width={20} height={20} />
                    </Button>
                  )}
                </div>

                <Button
                  placeholder={""}
                  variant="gradient"
                  color="gray"
                  onClick={() => handleSubmitFeed()}
                >
                  {scopedT("popup.add_form.add_feed_btn")}
                </Button>
              </>
            )}

            {updateFeedItem && (
              <>
                <Button
                  placeholder={""}
                  variant="gradient"
                  color="gray"
                  onClick={() => handleSubmitUpdatedFeed()}
                >
                  {scopedT("popup.edit_form.edit_feed_btn")}
                </Button>
              </>
            )}
          </DialogFooter>
        </Card>
      </Dialog>

      {!updateFeedItem && (
        <FeedFileInputComponent feedFormHook={feedFormHook} />
      )}

      {children}
    </>
  );
}
