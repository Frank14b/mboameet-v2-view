"use client";

import { useMainContext } from "@/app/contexts/main";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { useProfileContext } from "./template";
import ProfileImageComponent from "@/app/components/layout/profile/profileImage";
import ProfileDetailsComponent from "@/app/components/layout/profile/profileDetails";

export default function ProfilePage() {

    const mainContext = useMainContext();
    const profileContext = useProfileContext();

    return <>
        <div className="w-full flex absolute dark:text-white right-0 px-5">
            <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Profile</Typography></div>
            <div className="w-1/2 text-xs flex justify-end pt-1">
                <span className="mx-2 cursor-pointer font-bold flex cursor-pointer" onClick={() => profileContext.handleOpenEditProfile()}>Edit&nbsp;<PencilIcon width={15} height={15} /></span>
            </div>
        </div>
        {/*  */}

        <div className="w-full mt-12">

            <ProfileImageComponent
                username={mainContext.connectedUser?.userName}
                changeProfilePicture={profileContext.changeProfilePicture}
            />

            <ProfileDetailsComponent connectedUser={mainContext.connectedUser}/>

        </div>

        {/*  */}
    </>
}