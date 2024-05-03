import {
  Square3Stack3DIcon,
  UserCircleIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export const OTP_TIMER: number = parseInt(
  process.env.NEXT_PUBLIC_API_PUBLIC_RESEND_OTP_TIMER ?? "30"
);

export const passwordRegex: string =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
export const passwordErrorMessage: string =
  "Password must contains upper, lowercase, number, special char and min 8 digits";
export const invalidEmailErrorMessage: string =
  "Invalid email e.g: example@test.com";
export const requiredEmailErrorMessage: string = "Email address is required";
export const defaultProfileImg: string =
  "https://docs.material-tailwind.com/img/team-3.jpg";

export const mainDivComponentId: string = `main-app-div`;
export const referenceKeyword: string = `feed-card-item-`;
export const referenceCommentKeyword: string = `feed-item-ref-comment-`;
export const feedFormEditable: string = `feedFormEditable`;
export const feedCommentFormEditable: string = `feedCommentFormEditable`;
export const feedInputFile: string = `custom-feed-input-file`;
export const feedInputVideoFile: string = `custom-feed-input-video-file`;
export const feedVideoPreviewId: string = `feed-video-preview`;
export const feedVideoReaderId: string = `feed-video-reader`;

export const loginPathUrl: string = `/auth/signin`;

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
