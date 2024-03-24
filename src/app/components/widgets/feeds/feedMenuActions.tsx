"use client";

import useUserStore from "@/app/store/userStore";
import { FeedItemMenuAction } from "@/app/types";
import {
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

export default function FeedItemActionMenuComponent({
  feedData,
  onShare,
  onActionEdit,
  deleteItem,
}: FeedItemMenuAction) {
  //
  const userStore = useUserStore();

  return (
    <div className="absolute right-5">
      <Menu placement="bottom-end">
        <MenuHandler>
          {/* <ListBulletIcon className="h-6 w-6 dark:text-gray-500 cursor-pointer" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </MenuHandler>
        <MenuList placeholder={""} className="p-0">
          <MenuItem
            placeholder={"Share"}
            className="flex items-center gap-2"
            onClick={() => onShare()}
          >
            <ShareIcon className="h-4 w-5" />
            <Typography
              placeholder={"Share"}
              variant="small"
              className="font-medium"
            >
              Share
            </Typography>
          </MenuItem>

          {feedData.user.id === userStore.user?.id && (
            <>
              <MenuItem
                placeholder={""}
                className="flex items-center gap-2"
                onClick={() => onActionEdit()}
              >
                <PencilIcon className="h-4 w-5" />
                <Typography
                  placeholder={"Edit"}
                  variant="small"
                  className="font-medium"
                >
                  Edit
                </Typography>
              </MenuItem>
              <MenuItem
                placeholder={""}
                className="flex items-center gap-2"
                onClick={() => deleteItem()}
              >
                <TrashIcon className="h-4 w-5" />
                <Typography
                  placeholder={"Delete"}
                  variant="small"
                  className="font-medium"
                >
                  Delete
                </Typography>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  );
}
