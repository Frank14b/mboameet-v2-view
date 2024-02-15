'use client';

import { List, Typography } from "@material-tailwind/react";
import SideBarMenuListComponent from "../../widgets/sidebar/menuList";
import UserCardV2Component from "../../widgets/userCardV2";
import SideBarMenuListUserComponent from "../../widgets/sidebar/menuListUser";
import FeedNewsComponent from "../../widgets/feedNews";
import SideBarMenuComponent from "../../commons/sidebarMenu";

export default function HomePageComponent() {
    return (
        <div className="mh-600">
            <div className="flex">
                <div className="w-1/4 bg-gray-100 dark:bg-gray-900	 h-screen overflowY">
                    
                    <SideBarMenuComponent><></></SideBarMenuComponent>

                </div>
                <div className="w-1/2 bg-gray-100 dark:bg-gray-900">
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
                <div className="w-1/4 bg-gray-100 dark:bg-gray-900">
                    <div className="flex flex-col h-screen pt-6 overflow-y-auto dark:text-gray-300">
                        <div className="w-full pb-6">
                            <Typography placeholder={""} className="font-bold px-1 pb-4">Stories</Typography>

                            <div className="flex">
                                <div className="w-1/2">
                                    <div className="p-1"><UserCardV2Component title="" description="" image="../full-shot-people-use-apps-make-friends.jpg" bgImage="../communication-social-media-icons-smartphone-device.jpg" /></div>
                                    <div className="p-1"><UserCardV2Component title="" description="" image="../full-shot-people-use-apps-make-friends.jpg" bgImage="../beautiful-rendering-dating-app-concept.jpg" /></div>
                                </div>
                                <div className="w-1/2">
                                    <div className="p-1"><UserCardV2Component title="" description="" image="../full-shot-people-use-apps-make-friends.jpg" bgImage="../beautiful-rendering-dating-app-concept.jpg" /></div>
                                    <div className="p-1"><UserCardV2Component title="" description="" image="../full-shot-people-use-apps-make-friends.jpg" bgImage="../bgac72c497338f11a05d3d.jpg" /></div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full pb-6">
                            <Typography placeholder={""} className="font-bold px-1">Suggestions</Typography>

                            <div className="w-full">
                                <SideBarMenuListUserComponent users={[
                                    {
                                        title: "Tania Andrew",
                                        image: "https://docs.material-tailwind.com/img/face-1.jpg",
                                    },
                                    {
                                        title: "Emma Willever",
                                        image: "https://docs.material-tailwind.com/img/face-3.jpg",
                                    }
                                ]} />
                                <p className="text-xs text-undelined px-1">See All</p>
                            </div>
                        </div>

                        <div className="w-full pb-6">
                            <Typography placeholder={""} className="font-bold px-1">Recommendations</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
