"use client";

import { ProfileHookDto } from "@/app/hooks/pages/profile/useUserProfile";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import ProfileImageComponent from "./ProfileImageComponent";
import ProfileDetailsComponent from "./ProfileDetailsComponent";
import { UpdateProfileFormComponent } from "./UpdateProfileFormComponent";
import { useScopedI18n } from "@/app/locales/client";

export default function ProfileAccountComponent({
  userProfileHook,
}: {
  userProfileHook: ProfileHookDto;
}) {
  //
  const {
    changeProfilePicture,
    imageToUpload,
    connectedUser,
    uploadProfileImage,
    handleOpenEditProfile,
  } = userProfileHook;
  //

  const scopedT = useScopedI18n("profile");

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2">
          <Typography placeholder={""} className="font-bold px-1">
            {scopedT("title")}
          </Typography>
        </div>
        <div className="w-1/2 text-xs flex justify-end pt-1">
          <span
            className="mx-2 cursor-pointer font-bold flex cursor-pointer"
            onClick={() => handleOpenEditProfile()}
          >
            {scopedT("edit_profile")}&nbsp;
            <PencilIcon width={15} height={15} />
          </span>
        </div>
      </div>
      {/*  */}

      <div className="w-full mt-12">
        <ProfileImageComponent
          username={connectedUser?.userName}
          photo={connectedUser?.photo}
          changeProfilePicture={changeProfilePicture}
          imageToUpload={imageToUpload}
          uploadProfileImage={uploadProfileImage}
        />

        <ProfileDetailsComponent connectedUser={connectedUser} />

        <UpdateProfileFormComponent userProfileHook={userProfileHook} />
      </div>

      {/*  */}
    </>
  );
}
