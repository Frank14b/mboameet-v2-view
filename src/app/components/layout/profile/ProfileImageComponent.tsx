"use client";

import { Avatar } from "@material-tailwind/react";
import { ChangeEvent } from "react";
import CropImage from "../../widgets/CropImage";
import { ObjectKeyDto } from "@/app/types";
import { useScopedI18n } from "@/app/locales/client";
import CustomNextImage from "../../widgets/CustomNextImage";

export default function ProfileImageComponent({
  username,
  photo,
  imageToUpload,
  changeProfilePicture,
  uploadProfileImage,
}: {
  username: string;
  photo: string;
  imageToUpload: string | null;
  changeProfilePicture: (e: ChangeEvent<HTMLInputElement>) => void;
  uploadProfileImage: (image: string | Blob | ObjectKeyDto) => Promise<void>;
}) {

  const scopedT = useScopedI18n("profile");

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-800 dark:hover:bg-gray-900"
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
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{scopedT("click_to_upload")}</span> {scopedT("or_drag_and_drop")}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>

            <CustomNextImage
              alt={username}
              className="cursor-pointer mt-5 border-2 border-pink-100 rounded-full"
              src={photo}
              width={100}
              height={100}
            />
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeProfilePicture(e)
            }
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>

      {imageToUpload && (
        <CropImage
          image={imageToUpload}
          croppedImage={uploadProfileImage}
          returnType={"blob"}
        />
      )}
    </>
  );
}
