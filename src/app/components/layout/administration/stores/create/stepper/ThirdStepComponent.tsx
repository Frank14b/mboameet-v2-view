import React, { useEffect } from "react";

import { AdminStoreHookDto } from "@/app/hooks/pages/administration/stores/useAdminStore";
import ImageUploadDropZone from "@/app/components/widgets/ImageUploadDropZone";

export function CreateStoreThirdStepComponent({
  adminStoreHook,
}: {
  adminStoreHook: AdminStoreHookDto;
}) {
  const { 
    selectedImage, 
    croppedImage, 
    formErrors,
    selectImageFile, 
    handleCroppedImage } = adminStoreHook;

    useEffect(() => {
      console.log(formErrors);
    }, [formErrors])

  return (
    <>
      <ImageUploadDropZone
        croppedImage={croppedImage}
        imageToUpload={selectedImage}
        errorFound={formErrors?.photo ? true : false}
        selectFile={selectImageFile}
        cropImage={handleCroppedImage}
      />
    </>
  );
}
