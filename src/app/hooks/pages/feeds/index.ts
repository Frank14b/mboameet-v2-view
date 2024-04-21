import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateFeedSchema } from "../../../validators";
import {
  ApiResponseDto,
  EmojiSelected,
  FeedHookDto,
  ObjectKeyDto,
  ResultFeed,
  ResultPaginate,
} from "../../../types";
import {
  getFeeds,
  proceedDeleteFeed,
  proceedSubmitFeed,
  proceedUpdateFeed,
} from "../../../services/server-actions";
import {
  createVideoPreview,
  feedFormEditable,
  feedVideoPreviewId,
  fileExtFromBase64,
  focusOnLastText,
  focusPosition,
  formatHashTags,
  getContentEditable,
  validateFileUploadType,
} from "@/app/lib/utils";

export function useFeedHook(): FeedHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateFeedSchema), // Integrate Yup for validation
  });
  //
  const [openFeedForm, handleOpenFeedForm] = useState<boolean>(false);
  const [openFeedFormImages, handleOpenFeedFormImages] =
    useState<boolean>(false);
  const [updateFeedItem, setUpdateFeedItem] = useState<ResultFeed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [openFeedForm, updateFeedItem]);

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

    if (result.status) {
      content.innerHTML = "";
      handleOpenFeedForm(false);
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
  ///

  useEffect(() => {
    if (!openFeedForm) {
      setUpdateFeedItem(null);
    }
  }, [openFeedForm]);

  const fetchFeeds = async () => {
    const result: ApiResponseDto<ResultPaginate<ResultFeed[]>> = await getFeeds(
      {
        revalidate: true,
      }
    );

    setLoading(false);
    if (result.status && result?.data?.data) {
      return result.data.data;
    }

    return [];
  };

  const deleteItemAsync = async ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => {
    const result = await proceedDeleteFeed(itemId);
    if (result.status) {
      document.getElementById(itemRef)?.remove();
    }
  };

  const data: FeedHookDto = {
    isLoading,
    errors,
    openFeedForm,
    openFeedFormImages,
    updateFeedItem,
    loading,
    image,
    feedInputValue,
    linkedImages,
    linkedVideos,
    setImage,
    setIsLoading,
    register,
    handleSubmit,
    handleOpenFeedForm,
    handleOpenFeedFormImages,
    setUpdateFeedItem,
    deleteItemAsync,
    fetchFeeds,
    handleGetCursorPosition,
    uploadProfileImage,
    handleSelectFeedVideo,
    addSelectedEmoji,
    removeSelectedImage,
    handleSubmitFeed,
    handleSubmitUpdatedFeed,
  };

  return { ...data };
}

export default useFeedHook;
