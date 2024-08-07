import { notification } from "@/app/lib/notifications";
import { ResultPaginate, ResultStoriesDto, StoriesTypes } from "@/app/types";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  proceedGetStories,
  proceedSaveStories,
} from "../services/server-actions";
import { blobToBase64 } from "../lib/cropImage";
import { useMainContext } from "../contexts/main";

export type GetStoriesProps = {
  page?: number;
  limit?: number;
};

export type SubmitStoriesProps = {
  type: StoriesTypes;
  image?: File | null;
};

const useStories = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storiesTextEditableRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [stories, setStories] = useState<
    ResultPaginate<ResultStoriesDto[]> | undefined
  >(undefined);

  const { getFileUrl } = useMainContext();

  const handleGetStories = useCallback(
    async ({ page, limit }: GetStoriesProps) => {
      const result = await proceedGetStories({ page, limit });
      if (result.status) {
        setStories(result.data);
      }
    },
    [setStories]
  );

  const formattedStories = useMemo(() => {
    return (
      stories?.data?.map((item) => {
        //
        const mediaUrl =
          item.fileUrl?.length > 0
            ? getFileUrl(item.fileUrl, item.user.id, "stories")
            : item.fileUrl;

        return {
          ...item,
          fileUrl: mediaUrl,
          user: {
            ...item.user,
            photo: getFileUrl(
              item.user.photo,
              item.user.id,
              item.user.userName
            ),
          },
        };
      }) ?? []
    );
  }, [stories]);

  const getImagePreview = useCallback(async () => {
    if (!selectedImage) return;
    const file = await blobToBase64(selectedImage);
    setImagePreview(file);
  }, [selectedImage, setImagePreview]);

  const selectFileImage = useCallback(
    (files: FileList | null) => {
      if (files?.[0]) {
        setSelectedImage(files[0]);
      }
    },
    [setSelectedImage, getImagePreview]
  );

  useEffect(() => {
    if (!selectedImage) return;
    getImagePreview();
  }, [selectedImage, getImagePreview]);

  const handleSubmitStories = useCallback(
    async ({ type, image }: SubmitStoriesProps) => {
      //
      const content = storiesTextEditableRef.current?.innerHTML ?? "";

      const formData = new FormData();
      formData.append(
        "content",
        `${content.length > 0 ? content : "@Stories"}`
      );
      formData.append("type", type.toLowerCase());

      if (type == StoriesTypes.TEXT) {
        if (!content) return false;
        //
      } else if (type == StoriesTypes.IMAGE) {
        if (!selectedImage && !image) return false;
        formData.append("image", image ?? (selectedImage as Blob));
        //
      } else if (type == StoriesTypes.VIDEO) {
        formData.append("video", "");
        //
      } else if (type == StoriesTypes.AUDIO) {
        formData.append("audio", "");
      }

      setIsLoading(true);

      const result = await proceedSaveStories(formData);

      notification.apiNotify(result);

      setIsLoading(false);

      return result.status;
    },
    [storiesTextEditableRef, selectedImage, notification, setIsLoading]
  );

  const data: NavBarHookDto = {
    isLoading,
    stories: formattedStories,
    storiesTextEditableRef,
    selectedImage,
    imagePreview,
    setIsLoading,
    handleSubmitStories,
    selectFileImage,
    handleGetStories,
  };

  return { ...data };
};

export default useStories;

export type NavBarHookDto = {
  isLoading: boolean;
  stories: ResultStoriesDto[];
  storiesTextEditableRef: MutableRefObject<HTMLDivElement | null>;
  selectedImage: File | null;
  imagePreview: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmitStories: ({
    type,
    image,
  }: SubmitStoriesProps) => Promise<boolean>;
  selectFileImage: (files: FileList | null) => void;
  handleGetStories: ({ page, limit }: GetStoriesProps) => void;
};
