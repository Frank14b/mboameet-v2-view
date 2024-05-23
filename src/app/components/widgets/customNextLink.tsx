import { useMainContext } from "@/app/contexts/main";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomNextLink({
  children,
  ...props
}: LinkProps & {
  children?: React.ReactNode;
}) {
  //
  const { setNavigationChange } = useMainContext();
  const pathname = usePathname();

  const handleOnClick = () => {
    if (pathname != props.href) {
      setNavigationChange("start");
    }
  };

  return (
    <Link onClick={handleOnClick} {...props}>
      {children}
    </Link>
  );
}
