import { Typography } from "@material-tailwind/react";
import UserCardV2Component from "../widgets/userCardV2";
import SideBarMenuListUserComponent from "../widgets/sidebar/menuListUser";

export default function AsideBarMenuComponent({ children }: { children: any }) {
    return <>
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
    </>
}