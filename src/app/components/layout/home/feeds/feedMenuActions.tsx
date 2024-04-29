"use client";

import { FeedItemMenuAction } from "@/app/types";
import {
  PencilIcon,
  PlusIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  IconButton,
  SpeedDial,
  SpeedDialContent,
  SpeedDialHandler,
} from "@material-tailwind/react";
import SpeedDialButtonComponent from "../../../widgets/speedDialButton";
import { useMemo } from "react";

export default function FeedItemActionMenuComponent({
  feedData,
  onShare,
  onActionEdit,
  deleteItem,
  canEditFeed
}: FeedItemMenuAction) {
  //
  const userCanEditFeed = useMemo(() => {
    return canEditFeed(feedData);
  }, [canEditFeed, feedData]);

  return (
    <>
      <div className="absolute right-2">
        <SpeedDial placement="left">
          <SpeedDialHandler>
            <IconButton
              placeholder={""}
              style={{ width: "25px", height: "25px" }}
              variant="text"
              size="sm"
              className="rounded-full bg-white-100 text-gray-500 dark:bg-gray-900 dark:text-gray-800"
            >
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45 dark:text-gray-800 dark:hover:text-gray-400" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent placeholder={""} className="flex-row">
            {userCanEditFeed && (
              <SpeedDialButtonComponent onClick={() => onActionEdit()}>
                <PencilIcon className="h-3 w-3 dark:text-gray-400" />
              </SpeedDialButtonComponent>
            )}
            {userCanEditFeed && (
              <SpeedDialButtonComponent onClick={() => deleteItem()}>
                <TrashIcon className="h-3 w-3 dark:text-gray-400" />
              </SpeedDialButtonComponent>
            )}
            <SpeedDialButtonComponent onClick={() => onShare()}>
              <ShareIcon className="h-3 w-3 dark:text-gray-400" />
            </SpeedDialButtonComponent>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </>
  );
}
