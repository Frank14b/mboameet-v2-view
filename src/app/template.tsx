"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { CreateFeedSchema } from "./validators";
import {
  ApiResponseDto,
  FeedCommentData,
  ResultFeed,
  ResultPaginate,
} from "./types";
import {
  getFeedComments,
  getFeeds,
  proceedDeleteFeed,
  proceedDesLikeFeed,
  proceedLikeFeed,
} from "./services/server-actions/feeds";

export default function Template({ children }: { children: React.ReactNode }) {
  //render the page
  return <HomeWrapper>{children}</HomeWrapper>;
}

const HomeContext = createContext<any>({});
export function HomeWrapper({ children }: { children: any }) {
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
  const [feeds, setFeeds] = useState<ResultFeed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openComment, setOpenComment] = useState<number>(0);
  const [editCommentId, setEditCommentId] = useState<number>(0);

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
    if (result.status && result?.data?.data) {
      setFeeds(result.data.data);
    }
    setLoading(false);
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

  const likeFeed = async ({ itemId }: { itemId: number }) => {
    await proceedLikeFeed(itemId);
  };

  const desLikeFeed = async ({ itemId }: { itemId: number }) => {
    await proceedDesLikeFeed(itemId);
  };

  const fetchComments = async ({ itemId }: { itemId: number }) => {
    const result = await getFeedComments(itemId);
    if (result.status) return result.data?.data ?? null;
    return null;
  };

  const contextData: HomeContextDto = {
    isLoading,
    errors,
    openFeedForm,
    openFeedFormImages,
    updateFeedItem,
    loading,
    feeds,
    editCommentId, 
    openComment, 
    setOpenComment,
    setEditCommentId,
    setIsLoading,
    register,
    handleSubmit,
    handleOpenFeedForm,
    handleOpenFeedFormImages,
    setUpdateFeedItem,
    likeFeed,
    desLikeFeed,
    fetchComments,
    deleteItemAsync,
    fetchFeeds,
  };

  return <HomeContext.Provider value={contextData}>{children}</HomeContext.Provider>;
}

export const useHomeContext = (): HomeContextDto => useContext(HomeContext);

export type HomeContextDto = {
  isLoading: boolean;
  errors: FieldErrors<any>;
  openFeedForm: boolean;
  openFeedFormImages: boolean;
  updateFeedItem: ResultFeed | null;
  loading: boolean;
  feeds: ResultFeed[];
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  handleOpenFeedFormImages: Dispatch<SetStateAction<boolean>>;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
  likeFeed: ({ itemId }: { itemId: number }) => void;
  desLikeFeed: ({ itemId }: { itemId: number }) => void;
  fetchComments: ({ itemId }: { itemId: number }) => Promise<FeedCommentData[] | null>;
  deleteItemAsync: ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => Promise<void>;
  fetchFeeds: () => void;
  editCommentId: number,
  setEditCommentId: Dispatch<SetStateAction<number>>;
  openComment: number;
  setOpenComment: Dispatch<SetStateAction<number>>;
};
