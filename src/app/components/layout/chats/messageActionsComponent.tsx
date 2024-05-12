import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import SpeedDialButton from "../../widgets/speedDialButton";
import { messageActionsList } from "@/app/lib/constants/app";
import { MessageProps } from "./messagesComponent";
import { MessageActionType } from "@/app/types";

export default function MessageActionsComponent({
  item,
  onActionClick,
}: {
  item: MessageProps;
  onActionClick?: (item: MessageProps, action: MessageActionType) => void;
}) {
  //
  const customClass = "bg-gray-900";
  const reactionCommonClass = "h-4 w-4 text-gray-300";
  //
  return (
    <div className="groupIcon">
      <SpeedDial placement="top">
        <SpeedDialHandler>
          <IconButton
            placeholder={""}
            style={{ width: "20px", height: "20px" }}
            variant="text"
            size="sm"
            className={`rounded-full bg-gray-80 text-gray-500 dark:bg-gray-800 dark:text-gray-600`}
          >
            <PlusIcon className="h-3 w-3 transition-transform groupIcon-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent placeholder={""}>
          {messageActionsList.map((action, index) => (
            <SpeedDialButton customClass={customClass} key={index}>
              <action.icon
                className={`${reactionCommonClass} ${action.color}`}
                onClick={() => onActionClick?.(item, action.key)}
              />
            </SpeedDialButton>
          ))}
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
