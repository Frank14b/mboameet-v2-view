import { useMainContext } from "@/app/contexts/main";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomNextLink({
  children,
  className,
  ...props
}: LinkProps & {
  children?: React.ReactNode;
  className?: string;
}) {
  //
  const { setNavigationChange } = useMainContext();
  const pathname = usePathname();

  const handleOnClick = () => {
    if (pathname != props.href) {
      setNavigationChange?.("start");

      setTimeout(() => {
        setNavigationChange?.("stop");
      }, 3000);
    }
  };

  return (
    <Link onClick={handleOnClick} {...props} className={className}>
      {children}
    </Link>
  );
}
