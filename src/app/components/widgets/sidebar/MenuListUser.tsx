import { SideBarMenuListUser } from "@/app/types";
import {
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
export default function SideBarMenuListUserComponent({
  users,
}: {
  users: SideBarMenuListUser[];
}) {
  return (
    <List placeholder={""} className="px-0">
      {users?.map((user: SideBarMenuListUser, index: number) => (
        <ListItem placeholder={""} className="px-1" key={index}>
          <ListItemPrefix placeholder={""}>
            <Avatar
              placeholder={""}
              variant="circular"
              alt="candice"
              src={user.image}
            />
          </ListItemPrefix>
          <div className="line-clamp-1">
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="dark:text-pink-200 capitalize"
            >
              {user.title}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  );
}