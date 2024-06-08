"use client";

import { GalleriesComponent } from "@/app/components/layout/galleries/GalleriesComponent";
import useGalleries from "@/app/hooks/pages/galleries/useGalleries";
import { CameraIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export default function GalleryPage() {
  //
  const galleryHook = useGalleries();

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-4">
        <div className="w-1/2 px-0">
          <Typography placeholder={""} className="font-bold px-1 flex gap-2">
            <CameraIcon className="h-4 w-4 mt-[5px]" />
            Galleries
          </Typography>
        </div>
      </div>
      {/*  */}
      <div className="mt-12">
        <GalleriesComponent galleryHook={galleryHook} />
      </div>
      {/*  */}
    </>
  );
}
