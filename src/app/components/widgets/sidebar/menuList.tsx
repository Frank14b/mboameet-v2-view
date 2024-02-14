import { SideBarMenuList } from "@/app/types";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import {
    Chip,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
} from "@material-tailwind/react";

export default function SideBarMenuListComponent({ title, icon, active = false, badge }: SideBarMenuList) {

    return (
        <ListItem placeholder={""} className={`group rounded-xl py-1.5 px-3 my-1 text-sm font-normal ${active ? 'bg-black text-white' : 'text-blue-gray-900'}  hover:bg-pink-400 hover:text-white focus:bg-pink-500 focus:text-white`}>
            <ListItemPrefix placeholder={""}>
                <span className={`h-5 w-5 ${active ? 'text-white' : 'text-dark'}`}>{icon}</span>
            </ListItemPrefix>
            {title}
            {
                badge && (
                    <ListItemSuffix placeholder={""}>
                        <Chip
                            value={badge}
                            variant="ghost"
                            size="sm"
                            className={`rounded-full px-2 py-1 text-xs ${active ? 'bg-gray-400' : 'group-hover:bg-white/20 group-hover:text-white'} `}
                        />
                    </ListItemSuffix>
                )
            }
        </ListItem>
    )
}