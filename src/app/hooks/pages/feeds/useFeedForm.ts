import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { EmojiSelected, ObjectKeyDto, ResultFeed } from "../../../types";
import {
  proceedSubmitFeed,
  proceedUpdateFeed,
} from "../../../services/server-actions";
import {
  createVideoPreview,
  fileExtFromBase64,
  focusOnLastText,
  focusPosition,
  formatHashTags,
  getContentEditable,
  validateFileUploadType,
} from "@/app/lib/utils";
import { feedFormEditable, feedVideoPreviewId } from "@/app/lib/constants/app";
import { notification } from "@/app/lib/notifications";

export function useFeedForm(): FeedFormHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //
  const [openFeedForm, handleOpenFeedForm] = useState<boolean>(false);
  const [openFeedFormImages, handleOpenFeedFormImages] =
    useState<boolean>(false);
  const [updateFeedItem, setUpdateFeedItem] = useState<ResultFeed | null>(null);
  ////
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
    if (updateFeedItem) {
      content.innerHTML = formatHashTags(updateFeedItem.message); //set updated feed message
    } else {
      // format hash tags on first load if text available
      if (!content) return;
      content.innerHTML = formatHashTags(content.innerText);
    }
    content?.addEventListener("keyup", handleKeyPress);
  }, [updateFeedItem]);

  const addSelectedEmoji = (data: EmojiSelected) => {
    const content = getContentEditable(feedFormEditable);
    content.innerHTML = formatHashTags(content.innerText) + data.emoji;
  };

  const selectedImageFile = (image: string | Blob | ObjectKeyDto) => {
    let currentLinkedImages = linkedImages;
    const tmpImage: any = image;

    if (currentLinkedImages) {
      currentLinkedImages.push({
        ...tmpImage,
        id: currentLinkedImages.length + 1,
      });
    } else {
      currentLinkedImages = [
        {
          ...tmpImage,
          id: 1,
        },
      ];
    }
    setLinkedImages(currentLinkedImages);
  };

  const handleGetCursorPosition = () => {
    const content = getContentEditable(feedFormEditable);
    focusPosition(content);
  };

  const removeSelectedImage = (index: number) => {
    let currentLinkedImages = linkedImages;
    currentLinkedImages?.splice(index, 1);
    setLinkedImages(currentLinkedImages);
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
      message = "Hi!";
    }
    formData.append("message", message);

    const result = await proceedSubmitFeed(formData);

    notification.apiNotify<ResultFeed>(result);

    if (result.status) {
      content.innerHTML = "";
      handleOpenFeedForm(false);
      setLinkedImages(null);
    }
  };

  /** proceed to feed update (only text content can be updated here) */
  const handleSubmitUpdatedFeed = async () => {
    if (!updateFeedItem) return;
    const content = getContentEditable(feedFormEditable);

    const result = await proceedUpdateFeed({
      feedId: updateFeedItem.id,
      message: content.innerText,
    });

    notification.apiNotify<ResultFeed>(result);
    
    if (result.status) {
      content.innerHTML = "";
      handleOpenFeedForm(false);
    }
  };

  const uploadFeedImage = async (data: string | Blob | ObjectKeyDto) => {
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
  ///

  useEffect(() => {
    if (!openFeedForm) {
      setUpdateFeedItem(null);
    }
  }, [openFeedForm]);

  const data: FeedFormHookDto = {
    isLoading,
    openFeedForm,
    openFeedFormImages,
    updateFeedItem,
    image,
    feedInputValue,
    linkedImages,
    linkedVideos,
    setImage,
    setIsLoading,
    handleOpenFeedForm,
    handleOpenFeedFormImages,
    setUpdateFeedItem,
    handleGetCursorPosition,
    uploadFeedImage,
    handleSelectFeedVideo,
    addSelectedEmoji,
    removeSelectedImage,
    handleSubmitFeed,
    handleSubmitUpdatedFeed,
  };

  return { ...data };
}

export default useFeedForm;

export interface FeedFormHookDto {
  isLoading: boolean;
  openFeedForm: boolean;
  openFeedFormImages: boolean;
  updateFeedItem: ResultFeed | null;
  image: string;
  feedInputValue: string;
  linkedImages: ObjectKeyDto[] | null;
  linkedVideos: File[] | null;
  setImage: Dispatch<SetStateAction<string>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  handleOpenFeedFormImages: Dispatch<SetStateAction<boolean>>;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
  handleGetCursorPosition: () => void;
  uploadFeedImage: (data: string | Blob | ObjectKeyDto) => Promise<void>;
  handleSelectFeedVideo: (e: ChangeEvent<HTMLInputElement>) => void;
  addSelectedEmoji: (data: EmojiSelected) => void;
  removeSelectedImage: (index: number) => void;
  handleSubmitFeed: () => void;
  handleSubmitUpdatedFeed: () => void;
}
