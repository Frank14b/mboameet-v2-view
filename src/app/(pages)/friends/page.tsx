"use client";

import { Typography } from "@material-tailwind/react";

export default function FriendsPage() {
    return <>
        <div className="w-full flex absolute dark:text-white right-0 px-5">
            <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Friends</Typography></div>
            <div className="w-1/2 text-xs flex justify-end pt-1">
                <span className="mx-2 cursor-pointer">Request</span>
                <span className="mx-2 cursor-pointer font-bold">Network</span>
                <span className="mx-2 cursor-pointer">Recommendations</span>
            </div>
        </div>
        {/*  */}
        {/*  */}
    </>
}