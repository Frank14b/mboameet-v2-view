import { IconButton } from "@material-tailwind/react";
import React from "react";

export default function SpeedDialButton({
  children,
  customStyle,
  customClass,
  onClick,
}: {
  children: React.ReactNode;
  customClass?: string;
  customStyle?: {
    width: string;
    height: string;
  };
  onClick?: () => void;
}) {
  return (
    <IconButton
      className={`rounded-full ${customClass ?? 'dark:hover:bg-gray-800'}`}
      style={customStyle ?? { width: "25px", height: "25px" }}
      placeholder={""}
      size="sm"
      variant="text"
      onClick={() => onClick?.()}
    >
      {children}
    </IconButton>
  );
}
