import { SideBarMenuListUser } from "@/app/types";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

import CustomNextImage from "../CustomNextImage";
import { useCallback, useState } from "react";
import { ResultFriendsDto } from "@/app/types/friends";

export default function SideBarMenuListUserComponent({
  users,
}: {
  users: SideBarMenuListUser[];
}) {

  const [showUserDetails, setShowUserDetails] = useState<{
    status: boolean;
    friend?: SideBarMenuListUser;
  }>({ status: false });

  const onClickUserDetails = useCallback(
    (friend: SideBarMenuListUser) => {
      setShowUserDetails({
        status: true,
        friend: friend,
      });
    },
    [setShowUserDetails]
  );

  return (
    <>
      <List placeholder={""} className="px-0">
        {users?.map((user: SideBarMenuListUser, index: number) => (
          <ListItem
            placeholder={""}
            className="px-1"
            key={index}
            onClick={() => onClickUserDetails(user)}
          >
            <ListItemPrefix placeholder={""}>
              <CustomNextImage
                alt=""
                src={user.image}
                className="rounded-full"
                height={45}
                width={45}
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
    </>
  );
}