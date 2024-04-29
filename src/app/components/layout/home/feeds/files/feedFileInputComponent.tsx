import CropImage from "@/app/components/widgets/cropImage";
import { FeedFormHookDto } from "@/app/hooks/pages/feeds/useFeedForm";
import {
  feedInputFile,
  feedInputVideoFile,
} from "@/app/lib/constants/app";
import { createFileUploadString } from "@/app/lib/utils";
import { ChangeEvent } from "react";

export default function FeedFileInputComponent({
  feedFormHook,
}: {
  feedFormHook: FeedFormHookDto;
}) {
  const { image, setImage, handleSelectFeedVideo, uploadFeedImage } =
    feedFormHook;

  return (
    <>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setImage(createFileUploadString(e))
        }
        id={feedInputFile}
        accept="image/*"
        type="file"
        className="hidden"
      />
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSelectFeedVideo(e)
        }
        id={feedInputVideoFile}
        accept="video/*"
        type="file"
        className="hidden"
      />

      {image.length > 1 && (
        <>
          <CropImage
            image={image}
            croppedImage={uploadFeedImage}
            returnType={"object"}
            cropSize={{ width: 700, height: 360 }}
          />
        </>
      )}
    </>
  );
}
