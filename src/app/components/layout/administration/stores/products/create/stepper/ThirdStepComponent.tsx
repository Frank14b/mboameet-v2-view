import React from "react";

import ImageUploadDropZone from "@/app/components/widgets/ImageUploadDropZone";
import { AdminStoreProductHookDto } from "@/app/hooks/pages/administration/stores/products/useStoreProducts";

export function CreateStoreThirdStepComponent({
  adminProductHook,
}: {
  adminProductHook: AdminStoreProductHookDto;
}) {
  const { selectedImage, croppedImage, selectImageFile, handleCroppedImage } =
  adminProductHook;
  return (
    <>
      <ImageUploadDropZone
        croppedImage={croppedImage}
        imageToUpload={selectedImage}
        selectFile={selectImageFile}
        cropImage={handleCroppedImage}
      />
    </>
  );
}
