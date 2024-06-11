import CropImage from "@/app/components/widgets/CropImage";
import { createFileUploadString } from "@/app/lib/utils";
import { ObjectKeyDto } from "@/app/types";
import { ChangeEvent, useCallback, useState } from "react";
import { Size } from "react-easy-crop";

export default function ProductImageUploadComponent({
  productRef,
  cropSize,
  selectedImageFile,
}: {
  productRef: string;
  cropSize?: Size;
  selectedImageFile: (image: ObjectKeyDto, productRef: string) => void;
}) {
  //
  const [image, setImage] = useState<string>("");

  const uploadProfileImage = useCallback(
    async (data: string | Blob | ObjectKeyDto) => {
      selectedImageFile(data as ObjectKeyDto, productRef);
      setImage("");
    },
    [productRef, setImage, selectedImageFile]
  );

  return (
    <>
      <div className="flex items-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-34 h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-800 dark:hover:bg-gray-900"
        >
          <div className="flex flex-col items-center justify-center pt-5 p-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(createFileUploadString(e))
            }
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>

      {image.length > 1 && (
        <CropImage
          image={image}
          croppedImage={uploadProfileImage}
          returnType={"object"}
          cropSize={cropSize}
        />
      )}
    </>
  );
}
