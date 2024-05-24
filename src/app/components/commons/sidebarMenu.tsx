import { List } from "@material-tailwind/react";
import SideBarMenuListComponent from "../widgets/sidebar/menuList";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { ProfileMenuComponent } from "../widgets/profileMenu";
import {
  chatsPathUrl,
  galleriesPathUrl,
  marketplacePathUrl,
  settingPathUrl,
} from "@/app/lib/constants/app";
import useUserStore from "@/app/store/userStore";

export default function SideBarMenuComponent({ children }: { children: any }) {
  const pathname = usePathname();

  const { userConnected } = useUserStore();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <figure className="relative h-40 w-full">
          <figcaption className="absolute text-center bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white dark:border-0 bg-white/55 dark:bg-black/35 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <ProfileMenuComponent />
          </figcaption>
        </figure>
      </div>

      <div className="px-6">
        <List placeholder={""} className="my-2 p-0">
          <SideBarMenuListComponent
            title="News Feed"
            icon={<BookmarkIcon />}
            active={pathname == "/" ? true : false}
            badge="+99"
            link={"/"}
          />

          <SideBarMenuListComponent
            title="Discussions"
            icon={<ChatBubbleBottomCenterIcon />}
            active={pathname.startsWith(chatsPathUrl) ? true : false}
            badge={"1"}
            link={chatsPathUrl}
          />

          <SideBarMenuListComponent
            title="Friends"
            icon={<UsersIcon />}
            active={pathname.startsWith("/friends") ? true : false}
            badge="+30"
            link={"/friends"}
          />

          <SideBarMenuListComponent
            title="Market Place"
            icon={<ShoppingBagIcon />}
            active={pathname.startsWith(marketplacePathUrl) ? true : false}
            link={marketplacePathUrl}
          />

          <SideBarMenuListComponent
            title="Media"
            icon={<VideoCameraIcon />}
            active={pathname.startsWith(galleriesPathUrl) ? true : false}
            link={galleriesPathUrl}
          />

          <SideBarMenuListComponent
            title="Settings"
            icon={<Cog6ToothIcon />}
            active={pathname.startsWith(settingPathUrl) ? true : false}
            link={settingPathUrl}
          />
        </List>
      </div>
    </>
  );
}
