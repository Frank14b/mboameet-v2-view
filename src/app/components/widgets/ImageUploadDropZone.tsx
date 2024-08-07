"use client";

import { ChangeEvent } from "react";
import { ObjectKeyDto } from "@/app/types";
import CropImage from "./CropImage";
import CustomNextImage from "./CustomNextImage";
import { Size } from "react-easy-crop";

export default function ImageUploadDropZone({
  croppedImage,
  imageToUpload,
  cropSize,
  errorFound,
  selectFile,
  cropImage,
}: {
  croppedImage?: ObjectKeyDto;
  cropSize?: Size;
  imageToUpload: string | null;
  errorFound?: Boolean;
  selectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  cropImage: (image: string | Blob | ObjectKeyDto) => Promise<void>;
}) {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 
                border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 
                hover:bg-gray-100 dark:hover:border-gray-800 dark:hover:bg-gray-900
                ${
                  errorFound
                    ? "border-red-600"
                    : "border-gray-300 dark:border-gray-600"
                }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
            <p
              className={`mb-2 ${
                errorFound ? "text-red-600" : "text-gray-500 dark:text-gray-400"
              } text-sm`}
            >
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p
              className={`text-xs ${
                errorFound ? "text-red-600" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <div>
            {croppedImage?.base64 && (
              <>
                <CustomNextImage
                  alt=""
                  src={croppedImage.base64}
                  height={200}
                  width={200}
                  className="rounded-lg shadow-md"
                />
              </>
            )}
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => selectFile(e)}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>

      {imageToUpload && (
        <CropImage
          cropSize={cropSize}
          image={imageToUpload}
          croppedImage={cropImage}
          returnType={"object"}
        />
      )}
    </>
  );
}
