import { defaultImage } from "@/app/lib/constants/app";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

export default function CustomNextImage({
  className,
  ...props
}: ImageProps & {
  className?: string;
}) {
  //
  const [imgSrc, setImgSrc] = useState(true);
  //
  return (
    <Image
      {...props}
      src={imgSrc ? props.src : defaultImage}
      alt={props.alt ? props.alt : ""}
      className={`${className} ${imgSrc ? "" : "bg-gray-300 opacity-30 dark:opacity-100 dark:bg-gray-700"}`}
      onError={() => setImgSrc(false)}
    />
  );
}
