import { List, Typography } from "@material-tailwind/react";
import SideBarMenuListComponent from "../widgets/sidebar/menuList";
import { ChatBubbleBottomCenterIcon, Cog6ToothIcon, EnvelopeIcon, UsersIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function SideBarMenuComponent({ children }: { children: any }) {

    const pathname = usePathname();

    return <>
        <div className="flex flex-col items-center justify-center">
            <figure className="relative h-40 w-full">
                {/* <img
                    className="h-full w-full object-cover object-center"
                    src="../full-shot-people-use-apps-make-friends.jpg"
                    alt="nature image"
                /> */}
                <figcaption className="absolute text-center bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white dark:border-0 bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
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

                <SideBarMenuListComponent title="News Feed" icon={<EnvelopeIcon />} active={pathname == "/" ? true : false} badge="+99" link={"/"} />

                <SideBarMenuListComponent title="Discussions" icon={<ChatBubbleBottomCenterIcon />} active={pathname.startsWith("/chats") ? true : false} badge={"1"} link={"/chats"} />

                <SideBarMenuListComponent title="Friends" icon={<UsersIcon />} active={pathname.startsWith("/friends") ? true : false} badge="+30" link={"/friends"} />

                <SideBarMenuListComponent title="Media" icon={<VideoCameraIcon />} active={pathname.startsWith("/galleries") ? true : false} />

                <SideBarMenuListComponent title="Settings" icon={<Cog6ToothIcon />} active={pathname.startsWith("/settings") ? true : false} link={"/settings"} />

            </List>
        </div>
    </>
}