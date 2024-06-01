import { GalleriesHookDto } from "@/app/hooks/pages/galleries/useGalleries";
import AnimateHoverScale from "../../widgets/motions/animateHoverScale";
import { useCallback, useMemo, useState } from "react";
import {
  ImagePreviewPopup,
  ImagePreviewProps,
} from "../../widgets/imagePreviewPopup";
import CustomNextImage from "../../widgets/CustomNextImage";

export function ChatMediaComponent({
  galleryHook,
}: {
  galleryHook: GalleriesHookDto;
}) {
  const { chatMedias } = galleryHook;
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
    return chatMedias?.map(({ url, type }) => ({
      url,
      title: "",
      description: "",
      type,
    }));
  }, [chatMedias]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {chatMedias?.map(
        ({ url, type }, index) =>
          type === "image" && (
            <div key={index}>
              <AnimateHoverScale index={index}>
                <CustomNextImage
                  className="w-full blur-sm hover:blur-0 cursor-pointer max-w-full shadow-md rounded-lg object-cover object-center"
                  src={url}
                  alt="gallery-photo"
                  height={500}
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
