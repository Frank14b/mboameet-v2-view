"use client";

import {
  clickFileUpload,
  createFileUploadString,
  createVideoPreview,
  feedFormEditable,
  feedInputFile,
  feedInputVideoFile,
  feedVideoPreviewId,
  fileExtFromBase64,
  focusOnLastText,
  focusPosition,
  formatHashTags,
  getContentEditable,
  validateFileUploadType,
} from "@/app/lib/utils";
import { EmojiSelected, FeedForm, ObjectKeyDto } from "@/app/types";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import EmojiPickerButton from "../../commons/emojiPickerButton";
import {
  proceedSubmitFeed,
  proceedUpdateFeed,
} from "@/app/services/server-actions/feeds";
import {
  PhotoIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { useFeedContext } from "@/app/contexts/pages/feeds";
import CropProfileImage from "../../layout/profile/cropProfileImage";

export default function FeedFormCardComponent({
  children,
  openFeedForm,
  formFiles,
  updateItem,
}: FeedForm) {
  //
  const feedContext = useFeedContext();
  const [linkedImages, setLinkedImages] = useState<ObjectKeyDto[] | null>(null);
  const [linkedVideos, setLinkedVideos] = useState<File[] | null>(null);
  const [feedInputValue] = useState<string>("@feed");
  const [image, setImage] = useState<string>("");

  const handleKeyPress = (e: KeyboardEvent) => {
    const content = getContentEditable(feedFormEditable);
    if (e.key == " ") {
      content.innerHTML = formatHashTags(content.innerText);
      focusOnLastText(content);
    }
  };

  useEffect(() => {
    const content = getContentEditable(feedFormEditable);
    if (updateItem) {
      content.innerHTML = formatHashTags(updateItem.message); //set updated feed message
    } else {
      // format hash tags on first load if text available
      if (!content) return;
      content.innerHTML = formatHashTags(content.innerText);
    }
    content?.addEventListener("keyup", handleKeyPress);
  }, [openFeedForm, updateItem]);

  const addSelectedEmoji = (data: EmojiSelected) => {
    const content = getContentEditable(feedFormEditable);
    content.innerHTML = formatHashTags(content.innerText) + data.emoji;
  };

  const selectedImageFile = (image: string | Blob | ObjectKeyDto) => {
    let currentData = linkedImages;
    const tmpImage: any = image;

    if (currentData) {
      currentData.push({
        ...tmpImage,
        id: currentData.length + 1,
      });
    } else {
      currentData = [
        {
          ...tmpImage,
          id: 1,
        },
      ];
    }

    setLinkedImages(currentData);
  };

  const handleGetCursorPosition = () => {
    const content = getContentEditable(feedFormEditable);
    focusPosition(content);
  };

  const removeSelectedImage = (index: number) => {
    let currentData = linkedImages;
    currentData?.splice(index, 1);
    setLinkedImages(currentData);
  };

  /** process to feed creation */
  const handleSubmitFeed = async () => {
    const content = getContentEditable(feedFormEditable);

    const formData = new FormData();
    if (linkedImages && linkedImages.length > 0) {
      for (let i = 0; i < linkedImages.length; i++) {
        formData.append(
          "images",
          linkedImages[i].blob,
          `feed-${i}.${fileExtFromBase64(linkedImages[i].base64)}`
        );
      }
    }

    if (linkedVideos && linkedVideos.length > 0) {
      formData.append("video", linkedVideos[0]);
    }

    let message = content.innerText;

    if (message.trim().length == 0) {
      message = "@feed";
    }
    formData.append("message", message);

    const result = await proceedSubmitFeed(formData);
    if (result.status) {
      content.innerHTML = "";
      feedContext.handleOpenFeedForm(false);
      setLinkedImages(null);
    }
  };

  /** proceed to feed update (only text content can be updated here) */
  const handleSubmitUpdatedFeed = async () => {
    if (!updateItem) return;
    const content = getContentEditable(feedFormEditable);

    const result = await proceedUpdateFeed({
      feedId: updateItem.id,
      message: content.innerText,
    });

    if (result.status) {
      content.innerHTML = "";
      feedContext.handleOpenFeedForm(false);
    }
  };

  const uploadProfileImage = async (data: string | Blob | ObjectKeyDto) => {
    setLinkedVideos(null);
    selectedImageFile(data);
    setImage("");
  };

  const handleSelectFeedVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkedImages(null);

    if (!e?.target?.files?.[0]) return;

    const data = validateFileUploadType(e.target.files[0], "video");
    if (data?.status == false || !data?.file) return;

    setLinkedVideos([data.file]);
  };

  useEffect(() => {
    if (linkedVideos && linkedVideos?.length > 0) {
      createVideoPreview(linkedVideos[0], feedVideoPreviewId);
    }
  }, [linkedVideos]);

  return (
    <>
      <Dialog
        placeholder={""}
        open={openFeedForm}
        handler={feedContext.handleOpenFeedForm}
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
              onClick={() => feedContext.handleOpenFeedForm(false)}
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
                <EmojiPickerButton selected={addSelectedEmoji}>
                  <></>
                </EmojiPickerButton>
              </div>

              <div
                id={`${feedFormEditable}`}
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
            {!updateItem && linkedImages && linkedImages?.length > 0 && (
              <div className="w-full overflow-y-hidden overflow-x-auto flex gap-2 pt-5">
                {linkedImages.map((image: ObjectKeyDto, index: number) => (
                  <div key={index} className="relative">
                    <img
                      className="rounded shadow object-center"
                      src={image?.base64}
                      style={{ width: "110px", height: "70px" }}
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
            {!updateItem && linkedVideos && linkedVideos?.length > 0 && (
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
            {!updateItem && (
              <>
                {!linkedImages && (
                  <Button
                    placeholder={""}
                    variant="text"
                    color="gray"
                    onClick={() => clickFileUpload(feedInputVideoFile)}
                  >
                    <VideoCameraIcon width={20} height={20} />
                  </Button>
                )}

                {!linkedVideos && (
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
                  onClick={() => handleSubmitFeed()}
                >
                  Post Now
                </Button>
              </>
            )}

            {updateItem && (
              <>
                <Button
                  placeholder={""}
                  variant="gradient"
                  color="gray"
                  onClick={() => handleSubmitUpdatedFeed()}
                >
                  Update Now
                </Button>
              </>
            )}
          </DialogFooter>
        </Card>
      </Dialog>

      {!updateItem && (
        <>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(createFileUploadString(e))
            }
            id={feedInputFile}
            accept="image/*"
            type="file"
            className="hidden"
          />
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSelectFeedVideo(e)
            }
            id={feedInputVideoFile}
            accept="video/*"
            type="file"
            className="hidden"
          />

          {image.length > 1 && (
            <>
              <CropProfileImage
                image={image}
                croppedImage={uploadProfileImage}
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
