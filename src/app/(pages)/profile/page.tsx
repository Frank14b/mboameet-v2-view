"use client";

import { MainContextDto, useMainContext } from "@/app/contexts/main";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { ProfileContextDto, useProfileContext } from "../../contexts/pages/profile";
import ProfileImageComponent from "@/app/components/layout/profile/profileImage";
import ProfileDetailsComponent from "@/app/components/layout/profile/profileDetails";
import { defaultProfileImg } from "@/app/lib/utils";

export default function ProfilePage() {
  const mainContext: MainContextDto = useMainContext();
  const profileContext: ProfileContextDto = useProfileContext();

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
            onClick={() => profileContext.handleOpenEditProfile()}
          >
            Edit&nbsp;
            <PencilIcon width={15} height={15} />
          </span>
        </div>
      </div>
      {/*  */}

      <div className="w-full mt-12">
        <ProfileImageComponent
          username={mainContext.connectedUser?.userName}
          photo={
            mainContext.connectedUser?.photo?.length > 0
              ? `${process.env.NEXT_PUBLIC_API_PUBLIC_FILES_LINK}${
                  mainContext.connectedUser?.id
                }/${mainContext.connectedUser?.photo ?? ""}`
              : defaultProfileImg
          }
          changeProfilePicture={profileContext.changeProfilePicture}
        />

        <ProfileDetailsComponent connectedUser={mainContext.connectedUser} />
      </div>

      {/*  */}
    </>
  );
}
