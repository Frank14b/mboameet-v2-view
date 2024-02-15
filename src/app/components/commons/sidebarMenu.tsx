import { List, Typography } from "@material-tailwind/react";
import SideBarMenuListComponent from "../widgets/sidebar/menuList";
import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, EnvelopeIcon, UsersIcon, VideoCameraIcon } from "@heroicons/react/24/solid";

export default function SideBarMenuComponent({ children }: { children: any }) {
    return <>
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

                <SideBarMenuListComponent title="Settings" icon={<Cog6ToothIcon />} active={false} link={"/settings"} />

            </List>
        </div>
    </>
}