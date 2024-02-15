"use client";

import { Typography } from "@material-tailwind/react";

export default function SettingsPage() {
    return <>
        <div className="w-1/2 sm:w-full xs:w-full lg:w-1/2 bg-gray-100 z-10 dark:bg-gray-900">
            <div className="flex flex-col h-screen p-6 relative overflow-y-auto">

                <div className="w-full flex absolute dark:text-white right-0 px-5">
                    <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Settings</Typography></div>
                    <div className="w-1/2 text-xs flex justify-end pt-1">
                        {/* <span className="mx-2 cursor-pointer font-bold">Network</span> */}
                    </div>
                </div>
                {/*  */}
                {/*  */}
            </div>
        </div>
    </>
}