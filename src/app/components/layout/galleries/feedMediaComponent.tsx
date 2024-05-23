import { GalleriesHookDto } from "@/app/hooks/pages/galleries/useGalleries";
import Image from "next/image";
import AnimateHoverScale from "../../widgets/motions/animateHoverScale";
import {
  ImagePreviewPopup,
  ImagePreviewProps,
} from "../../widgets/imagePreviewPopup";
import { useCallback, useMemo, useState } from "react";

export function FeedMediaComponent({
  galleryHook,
}: {
  galleryHook: GalleriesHookDto;
}) {
  const { feedMedias } = galleryHook;
  const [openImage, setOpenImage] = useState<ImagePreviewProps | null>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenPreview = useCallback(
    (image: ImagePreviewProps) => {
      setOpenImage(image);
      setOpenModal(true);
    },
    [setOpenImage, setOpenModal]
  );

  const handleClosePreview = useCallback(() => {
    setOpenImage(null);
    setOpenModal(false);
  }, [setOpenImage, setOpenModal]);

  const previewImages = useMemo(() => {
    return feedMedias?.map(({ url, type }) => ({
      url,
      title: "",
      description: "",
      type,
    }));
  }, [feedMedias]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
      {feedMedias?.map(
        ({ url, type }, index) =>
          type === "image" && (
            <div key={index}>
              <AnimateHoverScale index={index}>
                <Image
                  className="w-full blur-xs hover:blur-0 cursor-pointer max-w-full shadow-md rounded-lg object-cover object-center"
                  src={url}
                  alt="gallery-photo"
                  height={1000}
                  width={500}
                  onClick={() =>
                    handleOpenPreview({
                      url,
                      description: "",
                      title: "",
                      type,
                    })
                  }
                />
              </AnimateHoverScale>
            </div>
          )
      )}
      
      <ImagePreviewPopup
        onClose={handleClosePreview}
        open={openModal}
        active={openImage as ImagePreviewProps}
        images={previewImages as ImagePreviewProps[]}
      />
    </div>
  );
}
