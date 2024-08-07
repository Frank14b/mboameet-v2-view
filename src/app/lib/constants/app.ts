import {
  CakeIcon,
  CameraIcon,
  DocumentTextIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  HeartIcon,
  PencilIcon,
  Square3Stack3DIcon,
  TrashIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { configs } from "../../../../app.config";
import {
  MessageActionsDto,
  MessageReactionsDto,
  StoriesTypes,
} from "@/app/types";

export const OTP_TIMER: number = parseInt(configs.RESEND_OTP_TIME ?? "30");

export const passwordRegex: string =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
export const passwordErrorMessage: string =
  "Password must contains upper, lowercase, number, special char and min 8 digits";
export const invalidEmailErrorMessage: string =
  "Invalid email e.g: example@test.com";
export const requiredEmailErrorMessage: string = "Email address is required";
export const defaultProfileImg: string =
  "https://docs.material-tailwind.com/img/team-3.jpg";
export const defaultImage: string = "/images/thumbnail_image.webp";

export const mainDivComponentId: string = `main-app-div`;
export const referenceKeyword: string = `feed-card-item-`;
export const referenceCommentKeyword: string = `feed-item-ref-comment-`;
export const feedFormEditable: string = `feedFormEditable`;
export const feedCommentFormEditable: string = `feedCommentFormEditable`;
export const feedInputFile: string = `custom-feed-input-file`;
export const feedInputVideoFile: string = `custom-feed-input-video-file`;
export const feedVideoPreviewId: string = `feed-video-preview`;
export const feedVideoReaderId: string = `feed-video-reader`;
export const messageFieldId: string = `message-input-field`;
export const messagesContentId: string = `messages-content-block`;
export const messageImageInputFieldId: string = `message-image-input-field`;

// app urls & path
export const loginPathUrl: string = `/auth/signin`;
export const signUpPathUrl: string = `/auth/signup`;
export const authStartPath: string = `/auth`;
export const chatStartPath: string = `/chats`;
export const chatsPathUrl: string = `/chats`;
export const verifyTokenPathUrl: string = `/auth/verify-token`;
export const changePasswordPathUrl: string = `/auth/change-password`;
export const profilePathUrl: string = `/profile`;
export const marketplacePathUrl: string = `/marketplace`;
export const walletPathUrl: string = `/wallets`;
export const galleriesPathUrl: string = `/galleries`;
export const settingPathUrl: string = `/settings`;
export const administrationPathUrl = {
  baseUrl: `/administration`,
  stores: `/administration/stores`,
};
export const friendPathUrl: string = `/friends`;

export const userEncryptionStorageKey: string = "userKey";

export const chatBgImageClassName = {
  darkMode: "dark:bg-[url('/images/pxFuelTwo.jpg')]",
  lightMode: "bg-[url('/images/pxFuelLight.jpg')]",
};

export const localStorageKey = {
  authToken: "authToken",
};

export const discussionTypes = {
  chats: {
    name: "users",
    key: "users",
    icon: UsersIcon,
  },
  groups: {
    name: "groups",
    key: "groups",
    icon: UserGroupIcon,
  },
};

export const friendTypes = {
  recommended: {
    name: "tab_recommend" as "tab_recommend",
    key: "recommended",
    icon: Square3Stack3DIcon,
  },
  matches: {
    name: "tab_matches" as "tab_matches",
    key: "matches",
    icon: UserCircleIcon,
  },
};

export const feedTypes = {
  recent: {
    name: "tab_recent" as "tab_recent",
    key: "recent",
    icon: Square3Stack3DIcon,
  },
  popular: {
    name: "tab_popular" as "tab_popular",
    key: "popular",
    icon: UserCircleIcon,
  },
};

export const messageReactionsList: MessageReactionsDto[] = [
  {
    key: "heart",
    icon: HeartIcon,
    color: "text-red-600",
    sort: 0,
  },
  {
    key: "cake",
    icon: CakeIcon,
    color: "text-pink-300",
    sort: 1,
  },
  {
    key: "faceSmile",
    icon: FaceSmileIcon,
    color: "text-yellow-400",
    sort: 2,
  },
  {
    key: "faceFrown",
    icon: FaceFrownIcon,
    color: "text-yellow-400",
    sort: 3,
  },
];

export const messageActionsList: MessageActionsDto[] = [
  {
    key: "edit",
    icon: PencilIcon,
    color: "",
    sort: 2,
  },
  {
    key: "delete",
    icon: TrashIcon,
    color: "",
    sort: 3,
  },
];

export const storiesTypes = [
  {
    title: "Stories Text",
    subTitle: "Publish a text stories on your board",
    icon: DocumentTextIcon,
    type: StoriesTypes.TEXT,
  },
  {
    title: "Photo Stories",
    subTitle: "Publish a photo stories on your board",
    icon: CameraIcon,
    type: StoriesTypes.IMAGE,
  },
  {
    title: "Video Stories",
    subTitle: "Publish a video stories on your board",
    icon: VideoCameraIcon,
    type: StoriesTypes.VIDEO,
  },
];

export const priceUnitTypes = ["Unit", "kg", "Gram", "Liter", "Pack"];

export const productCarouselResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1400 },
    items: 4,
  },
  large: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3,
  },
  medium: {
    breakpoint: { max: 1024, min: 960 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 960, min: 721 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 721, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const productDetailsCarouselResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1400 },
    items: 7,
  },
  large: {
    breakpoint: { max: 1400, min: 1024 },
    items: 5,
  },
  medium: {
    breakpoint: { max: 1024, min: 960 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 960, min: 721 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 721, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
