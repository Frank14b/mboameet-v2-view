"use client";

import { GalleriesComponent } from "@/app/components/layout/galleries/GalleriesComponent";
import useGalleries from "@/app/hooks/pages/galleries/useGalleries";
import { Typography } from "@material-tailwind/react";

export default function GalleryPage() {
  //
  const galleryHook = useGalleries();

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2 px-5">
          <Typography placeholder={""} className="font-bold px-1">
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
