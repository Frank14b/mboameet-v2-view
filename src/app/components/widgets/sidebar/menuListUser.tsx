import { SideBarMenuListUser } from "@/app/types";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import {
    Avatar,
    Chip,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";
// title, image, active = false, badge
export default function SideBarMenuListUserComponent({ users }: { users: SideBarMenuListUser[] }) {

    return (
        <List placeholder={""} className="px-0">
            {
                users?.map((user: SideBarMenuListUser, index: number) => (
                    <ListItem placeholder={""} className="px-1" key={index}>
                        <ListItemPrefix placeholder={""}>
                            <Avatar placeholder={""} variant="circular" alt="candice" src={user.image} />
                        </ListItemPrefix>
                        <div>
                            <Typography placeholder={""} variant="h6" color="blue-gray">
                                {user.title}
                            </Typography>
                            <Typography placeholder={""} variant="small" color="gray" className="font-normal">
                                Software Engineer @ Material
                            </Typography>
                        </div>
                    </ListItem>
                ))
            }
        </List>
    )
}