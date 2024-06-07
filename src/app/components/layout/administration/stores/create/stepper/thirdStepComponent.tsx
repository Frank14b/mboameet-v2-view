import React from "react";

import { AdminStoreHookDto } from "@/app/hooks/pages/administration/stores/useAdminStore";
import ImageUploadDropZone from "@/app/components/widgets/ImageUploadDropZone";

export function CreateStoreThirdStepComponent({
  adminStoreHook,
}: {
  adminStoreHook: AdminStoreHookDto;
}) {
  const { selectedImage, croppedImage, selectImageFile, handleCroppedImage } =
    adminStoreHook;
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
