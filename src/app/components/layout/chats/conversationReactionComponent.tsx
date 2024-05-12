import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import SpeedDialButton from "../../widgets/speedDialButton";
import { messageReactionsList } from "@/app/lib/constants/app";
import { useEffect, useState } from "react";
import { MessageReactionsDto } from "@/app/types";

export default function ConversationReactionComponent({
  active,
  itemId,
  onReactionClick,
}: {
  active: string;
  itemId: number;
  onReactionClick?: (itemId: number, reaction: string) => void;
}) {
  //
  const customClass = "bg-gray-900";
  const reactionCommonClass = "h-4 w-4";

  const [activeReaction, setActiveReaction] =
    useState<MessageReactionsDto | null>(null);

  useEffect(() => {
    const reaction = messageReactionsList.find(
      (reaction) => reaction.key == active
    );
    setActiveReaction(reaction ?? null);
  }, [active, setActiveReaction]);
  //
  return (
    <div
      className={`absolute left-16 bottom-7 ${
        activeReaction ? "" : "opacity-0"
      } hover:opacity-100`}
    >
      <SpeedDial placement="right">
        <SpeedDialHandler>
          <IconButton
            placeholder={""}
            style={{ width: "20px", height: "20px" }}
            variant="text"
            size="sm"
            className={`rounded-full ${
              activeReaction ? "bg-gray-800" : "bg-white"
            } text-gray-500 dark:bg-gray-800 dark:text-gray-600`}
          >
            {activeReaction ? (
              <activeReaction.icon
                className={`${reactionCommonClass} ${activeReaction.color}`}
                onClick={() => onReactionClick?.(itemId, "null")}
              />
            ) : (
              <PlusIcon className="h-3 w-3 transition-transform group-hover:rotate-45" />
            )}
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent placeholder={""} className="flex-row">
          {messageReactionsList.map(
            (reaction, index) =>
              reaction.key !== active && (
                <SpeedDialButton customClass={customClass} key={index}>
                  <reaction.icon
                    className={`${reactionCommonClass} ${reaction.color}`}
                    onClick={() => onReactionClick?.(itemId, reaction.key)}
                  />
                </SpeedDialButton>
              )
          )}
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
