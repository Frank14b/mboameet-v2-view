import { IconButton } from "@material-tailwind/react";
import React from "react";

export default function SpeedDialButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const customStyle = { width: "25px", height: "25px" };

  return (
    <IconButton
      className="rounded-full dark:hover:bg-gray-800"
      style={customStyle}
      placeholder={""}
      size="sm"
      variant="text"
      onClick={() => onClick?.()}
    >
      {children}
    </IconButton>
  );
}
