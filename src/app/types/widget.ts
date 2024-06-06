import {
  ApiResponseDto,
  FeedCommentData,
  ObjectKeyDto,
  ResultFeed,
  ResultFeedCommentDto,
} from ".";
import { Size } from "react-easy-crop";

export interface UserCardComponent {
  image?: string;
  title?: string;
  description?: string;
}

export interface UserStoriesCardProps {
  id: number;
  bgImage: string;
  image: string;
  activeStory: number;
  onStoryClick?: (id: number) => void;
}

export interface AboutCardComponent {
  title: string;
  icon: any;
  subTitle: string;
}

export interface SideBarMenuList {
  title: string;
  icon: any;
  active?: boolean;
  badge?: string;
  link?: string;
  scroll?: boolean;
}

export interface SideBarMenuListUser {
  title: string;
  image?: any;
  active?: boolean;
  badge?: string;
}

export type FeedItem<T, TT> = {
  feed: ResultFeed;
  fileType?: "carousel" | "images" | "video" | "image";
  feedHook: T;
  feedFormHook: TT;
  isExpanded: boolean;
  handleExpand?: () => void;
};

export type FeedItemMenuAction = {
  feedData: ResultFeed;
  onShare: () => void;
  onActionEdit: () => void;
  deleteItem: () => void;
  canEditFeed: (feed: ResultFeed) => boolean;
};

export interface FeedComments {
  feedData: ResultFeed;
  userLiked: boolean;
  handleReaction: () => void;
}

export interface FeedCommentFormProps {
  id?: number;
  feedId: number;
  updateItem?: FeedCommentData;
  onComment?: ({
    formRef,
    feedId,
  }: {
    formRef: string;
    feedId: number;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
  onEditComment?: ({
    formRef,
    feedId,
    updateItem,
  }: {
    formRef: string;
    feedId: number;
    updateItem: FeedCommentData;
  }) => Promise<ApiResponseDto<ResultFeedCommentDto> | null>;
}

export type FormFilesProps = {
  children: React.ReactNode;
  openFeedFiles: boolean;
  cropSize?: Size;
  handleOpenFeedFiles: (value: boolean) => void;
  selectedImageFile: (image: string | Blob | ObjectKeyDto) => void;
};

export interface AlertConfirmationProps {
  title?: string;
  message: string;
  defaultStatus: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}
