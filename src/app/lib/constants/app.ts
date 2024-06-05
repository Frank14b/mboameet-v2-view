import {
  CakeIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  HeartIcon,
  PencilIcon,
  Square3Stack3DIcon,
  TrashIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { configs } from "../../../../app.config";
import { MessageActionsDto, MessageReactionsDto } from "@/app/types";

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
export const defaultImage: string = "/NoPicture_s.png";

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
export const galleriesPathUrl: string = `/galleries`;
export const settingPathUrl: string = `/settings`;
export const administrationPathUrl = {
  baseUrl: `/administration`,
  stores: `/administration/stores`,
}
export const friendPathUrl: string = `/friends`;

export const userEncryptionStorageKey: string = "userKey";

export const chatBgImageClassName = {
  darkMode: "dark:bg-[url('/pxFuelTwo.jpg')]",
  lightMode: "bg-[url('/pxFuelLight.jpg')]",
}

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
    name: "recommended",
    key: "recommended",
    icon: Square3Stack3DIcon,
  },
  matches: {
    name: "matches",
    key: "matches",
    icon: UserCircleIcon,
  },
};

export const feedTypes = {
  recent: {
    name: "recent",
    key: "recent",
    icon: Square3Stack3DIcon,
  },
  popular: {
    name: "popular",
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
