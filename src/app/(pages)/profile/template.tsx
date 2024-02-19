"use client";

import CropProfileImage from "@/app/components/layout/profile/cropProfileImage";
import { ChangeEvent, Dispatch, SetStateAction, createContext, useContext, useState } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
    //render the page
    return <ProfileWrapper>{children}</ProfileWrapper>
}

const ProfileContext = createContext<any>({});
export function ProfileWrapper({ children }: { children: any }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    //
    const [image, setImage] = useState<string | null>(null);
    

    const changeProfilePicture = async (data: ChangeEvent<HTMLInputElement>) => {

        if (!data?.target?.files?.[0]) return; // if no file found return immediately
        setImage(URL.createObjectURL(data.target.files[0]));
    }

    const data: ProfileContextDto = {
        isLoading,
        setIsLoading,
        changeProfilePicture,
    };

    return (
        <ProfileContext.Provider value={data}>
            <div
                className={``}
            >
                {children}

                {image && (
                    <CropProfileImage image={image}/>
                )}

            </div>
        </ProfileContext.Provider>
    );
}

export const useProfileContext = (): ProfileContextDto => useContext(ProfileContext);

export type ProfileContextDto = {
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    changeProfilePicture: any,
}