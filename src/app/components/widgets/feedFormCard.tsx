"use client";

import {
  fileExtFromBase64,
  focusOnLastText,
  formatHashTags,
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
import { useEffect, useState } from "react";
import EmojiPickerButton from "../commons/emojiPickerButton";
import { proceedSubmitFeed } from "@/app/services/server-actions/feeds";
import FeedFilesUploadComponent from "./feedFilesUpload";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function FeedFormCardComponent({
  children,
  openFeedForm,
  handleOpenFeedForm,
  formFiles,
  openFormFiles,
  updateItem,
}: FeedForm) {
  //
  const [linkedImages, setLinkedImages] = useState<ObjectKeyDto[] | null>(null);
  const [feedInputValue] = useState<string>("@feed");
  const router = useRouter();

  const getFeedContentEditable = () => {
    const contentEditableDiv = document.getElementById(
      "feedFormEditable"
    ) as HTMLDivElement;

    return contentEditableDiv;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const content = getFeedContentEditable();
    if (e.key == " ") {
      content.innerHTML = formatHashTags(content.innerText);
      focusOnLastText(content);
    }
  };

  useEffect(() => {
    const content = getFeedContentEditable();
    if (updateItem) {
      content.innerHTML = formatHashTags(updateItem.message);
    } else {
      // format hahstags on first load if text available
      if (!content) return;
      content.innerHTML = formatHashTags(content.innerText);
    }
    content?.addEventListener("keyup", handleKeyPress);
  }, [openFeedForm, updateItem]);

  const addSelectedEmoji = (data: EmojiSelected) => {
    const content = getFeedContentEditable();
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

  const handleCloseImageForm = (value: boolean) => {
    openFormFiles(value);
    handleOpenFeedForm(true);
  };

  // process to feed creation
  const handleSubmitFeed = async () => {
    const content = getFeedContentEditable();

    const message = content.innerText;
    if (message.trim().length == 0) return;

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
    formData.append("message", message);

    const result = await proceedSubmitFeed(formData);
    if (result.status) {
      content.innerHTML = "";
      handleOpenFeedForm(false);
      router.refresh();
    }
  };

  // proceed to feed update (only text content can be update here)
  const handleSubmitUpdatedFeed = async () => {
    // const result = await proceedSubmitFeed();
    // if (result.status) {
    // contentEditableDiv.innerHTML = "";
    handleOpenFeedForm(false);
    // }
  };

  return (
    <>
      <Dialog
        placeholder={""}
        open={openFeedForm}
        handler={handleOpenFeedForm}
        dismiss={{
          escapeKey: false,
          outsidePress: true,
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
              Write the message and then click button.
            </Typography>
            <div className="grid gap-6 max-h-96 overflow-y-auto overflow-x-hidden w-full mx-w-full">
              <div className="w-full emoji-container">
                <EmojiPickerButton selected={addSelectedEmoji}>
                  <></>
                </EmojiPickerButton>
              </div>

              <div
                id="feedFormEditable"
                className="textarea text-gray-800 p-3 min-h-40 rounded border border-gray-900/30"
                role="textbox"
                contentEditable={true}
                suppressContentEditableWarning={true}
              >
                {" "}
                <>{feedInputValue}</>{" "}
              </div>
            </div>
            {/* // */}
            {!updateItem && linkedImages && linkedImages?.length > 0 && (
              <div className="w-full overflow-y-hidden overflow-x-auto flex gap-2 pt-5">
                {linkedImages.map((image: ObjectKeyDto, index: number) => (
                  <div key={index}>
                    <img
                      className="rounded shadow cursor-pointer"
                      src={image?.base64}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </DialogBody>
          <DialogFooter placeholder={""} className="space-x-2">
            {!updateItem && (
              <>
                <Button
                  placeholder={""}
                  variant="text"
                  color="gray"
                  onClick={() => openFormFiles(true)}
                >
                  <VideoCameraIcon width={20} height={20} />
                </Button>
                <Button
                  placeholder={""}
                  variant="text"
                  color="gray"
                  onClick={() => openFormFiles(true)}
                >
                  <PhotoIcon width={20} height={20} />
                </Button>
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
          <FeedFilesUploadComponent
            openFeedFiles={formFiles}
            handleOpenFeedFiles={handleCloseImageForm}
            selectedImageFile={selectedImageFile}
            cropSize={{ width: 700, height: 360 }}
          >
            <></>
          </FeedFilesUploadComponent>
        </>
      )}

      {children}
    </>
  );
}
