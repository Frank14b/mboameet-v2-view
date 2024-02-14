'use client';

import { List, Typography } from "@material-tailwind/react";
import SideBarMenuListComponent from "../../widgets/sidebar/menuList";
import { ChatBubbleBottomCenterIcon, EnvelopeIcon, UsersIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import UserCardV2Component from "../../widgets/userCardV2";
import SideBarMenuListUserComponent from "../../widgets/sidebar/menuListUser";
import FeedNewsComponent from "../../widgets/feedNews";

export default function HomePageComponent() {
    return (
        <div className="mh-600">
            <div className="flex">
                <div className="w-1/4 bg-gray-100 dark:bg-gray-900	 h-screen overflowY">
                    <div className="flex flex-col items-center justify-center">
                        <figure className="relative h-40 w-full">
                            {/* <img
                                className="h-full w-full object-cover object-center"
                                src="../full-shot-people-use-apps-make-friends.jpg"
                                alt="nature image"
                            /> */}
                            <figcaption className="absolute text-center bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                <Typography placeholder={""} variant="h5" color="blue-gray">
                                    Sara Lamalo
                                </Typography>
                                <Typography placeholder={""} variant="h5" color="gray" className="mt-2 font-normal">
                                    Growth
                                </Typography>
                            </figcaption>
                        </figure>
                    </div>

                    <div className="px-6">
                        <List placeholder={""} className="my-2 p-0">

                            <SideBarMenuListComponent title="News Feed" icon={<EnvelopeIcon />} active={true} badge="+99" />

                            <SideBarMenuListComponent title="Forums" icon={<ChatBubbleBottomCenterIcon />} active={false} />

                            <SideBarMenuListComponent title="Friends" icon={<UsersIcon />} active={false} badge="+30" />

                            <SideBarMenuListComponent title="Media" icon={<VideoCameraIcon />} active={false} />

                            <SideBarMenuListComponent title="Settings" icon={""} active={false} />

                        </List>
                    </div>

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
