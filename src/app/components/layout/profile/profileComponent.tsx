"use client";

import useUserProfile from "@/app/hooks/pages/profile/useUserProfile";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import ProfileImageComponent from "./profileImageComponent";
import { defaultProfileImg } from "@/app/lib/constants/app";
import ProfileDetailsComponent from "./profileDetailsComponent";
import { UpdateProfileFormComponent } from "./updateProfileFormComponent";

export default function ProfileAccountComponent() {
  //
  const userProfileHook = useUserProfile();
  const {
    changeProfilePicture,
    imageToUpload,
    connectedUser,
    uploadProfileImage,
    handleOpenEditProfile,
  } = userProfileHook;
  //

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2">
          <Typography placeholder={""} className="font-bold px-1">
            Profile
          </Typography>
        </div>
        <div className="w-1/2 text-xs flex justify-end pt-1">
          <span
            className="mx-2 cursor-pointer font-bold flex cursor-pointer"
            onClick={() => handleOpenEditProfile()}
          >
            Edit&nbsp;
            <PencilIcon width={15} height={15} />
          </span>
        </div>
      </div>
      {/*  */}

      <div className="w-full mt-12">
        <ProfileImageComponent
          username={connectedUser?.userName}
          photo={
            connectedUser?.photo?.length > 0
              ? `${process.env.NEXT_PUBLIC_API_PUBLIC_FILES_LINK}${
                  connectedUser?.id
                }/${connectedUser?.photo ?? ""}`
              : defaultProfileImg
          }
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
