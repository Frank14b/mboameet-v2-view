import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  content,
  placement,
} from "@material-tailwind/react/types/components/popover";

export default function PopoverCustom({
  children,
  content,
  placement
}: {
  children: React.ReactNode;
  content: content;
  placement?: placement;
}) {
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover placement={placement} open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>{children}</PopoverHandler>
      <PopoverContent
        placeholder={""}
        {...triggers}
        className="z-50 max-w-[26rem] dark:bg-gray-900 dark:border-0"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
