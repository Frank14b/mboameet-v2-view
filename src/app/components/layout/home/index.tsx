'use client';

import { Typography } from "@material-tailwind/react";
import FeedNewsComponent from "../../widgets/feedNews";
import SideBarMenuComponent from "../../commons/sidebarMenu";
import AsideBarMenuComponent from "../../commons/asidebarMenu";

export default function HomePageComponent() {
    return (
        <div className="mh-600">
            <div className="flex">
                <div className="w-1/4 sm:fixed  bg-gray-100 dark:bg-gray-900 h-screen">
                    <SideBarMenuComponent><></></SideBarMenuComponent>
                </div>
                <div className="w-1/2 sm:w-50 bg-gray-100 dark:bg-gray-900">
                    <div className="flex flex-col h-screen p-6 relative overflow-y-auto">

                        <div className="w-full flex absolute dark:text-white right-0 px-5">
                            <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Feeds</Typography></div>
                            <div className="w-1/2 text-xs flex justify-end pt-1">
                                <span className="mx-2 cursor-pointer">Recents</span>
                                <span className="mx-2 cursor-pointer font-bold">Friends</span>
                                <span className="mx-2 cursor-pointer">Popular</span>
                            </div>
                        </div>

                        <div className="w-full px-3 mt-12 bg-white dark:bg-gray-800 rounded-xl p-3">
                            <FeedNewsComponent title="" icon={""} subTitle="" fileType="caroussel"/>
                        </div>
                        <div className="w-full px-3 mt-3 bg-white dark:bg-gray-800 rounded-xl p-3">
                            <FeedNewsComponent title="" icon={""} subTitle=""/>
                        </div>
                        <div className="w-full px-3 mt-3 bg-white dark:bg-gray-800 rounded-xl p-3">
                            <FeedNewsComponent title="" icon={""} subTitle="" fileType="images"/>
                        </div>
                        <div className="w-full px-3 mt-3 bg-white dark:bg-gray-800 rounded-xl p-3">
                            <FeedNewsComponent title="" icon={""} subTitle="" fileType="video"/>
                        </div>

                    </div>
                </div>
                <div className="w-1/4 sm:1/2 bg-gray-100 dark:bg-gray-900">
                    <div className="flex flex-col h-screen pt-6 overflow-y-auto dark:text-gray-300">
                        <AsideBarMenuComponent><></></AsideBarMenuComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}
