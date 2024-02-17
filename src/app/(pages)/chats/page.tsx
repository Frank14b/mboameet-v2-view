"use client";

import { useMainContext } from "@/app/contexts/main";
import { Typography } from "@material-tailwind/react";

export default function ChatsPage() {

    const mainContext = useMainContext();

    return <>

        <div className="w-full flex absolute dark:text-white right-0 px-5">
            <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Discussions</Typography></div>
            <div className="w-1/2 text-xs flex justify-end pt-1">
                {/* <span className="mx-2 cursor-pointer font-bold">Network</span> */}
            </div>
        </div>
        {/*  */}

        <div className="w-full mt-12">
            
        </div>

        {/*  */}
    </>
}