import { Button, Spinner } from "@material-tailwind/react";
import AnimateFadeOut from "../../widgets/motions/AnimateFadeOut";
import { useMainContext } from "@/app/contexts/main";
import useStories from "@/app/hooks/useStories";
import { StoriesTypes } from "@/app/types";
import { CameraIcon, PhotoIcon } from "@heroicons/react/24/solid";
import useCamera from "@/app/hooks/useCamera";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import CustomNextImage from "../../widgets/CustomNextImage";

export type StoriesImageComponentProps = {
  handleClose: () => void;
};

export default function StoriesImageComponent({
  handleClose,
}: StoriesImageComponentProps) {
  //
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  const [videoStyle, setVideoStyle] = useState<string>("hidden");

  const {
    storiesTextEditableRef,
    isLoading,
    imagePreview,
    selectedImage,
    handleSubmitStories,
    selectFileImage,
  } = useStories();

  const { isDark } = useMainContext();
  const { initMedia, closeMedia } = useCamera();

  const handleStartCamera = useCallback(() => {
    if (!videoRef.current) return;

    setVideoStyle("");
    initMedia({ audio: false, videoRef: videoRef.current });
  }, [videoRef, initMedia, setVideoStyle]);

  const submitStory = useCallback(async () => {
    const result = await handleSubmitStories({
      type: StoriesTypes.IMAGE,
      image: selectedImage,
    });
    if (result) {
      handleClose();
    }
  }, [handleClose, selectedImage]);

  return (
    <AnimateFadeOut>
      <div className="flex">
        <div className="w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-34 mb-5 rounded-lg cursor-pointer dark:bg-gray-800 
                ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            onClick={handleStartCamera}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CameraIcon className="size-9 mb-3" />
              <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                Take Photo
              </p>
            </div>
          </label>
        </div>
        <div className="w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-34 mb-5 rounded-lg cursor-pointer dark:bg-gray-800 
                ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <div
              className="flex flex-col items-center justify-center pt-5 pb-6"
              onClick={() => {
                closeMedia();
                setVideoStyle("hidden");
                inputImageRef.current?.click();
              }}
            >
              {imagePreview.length == 0 ? (
                <>
                  <PhotoIcon className="size-9 mb-3" />
                  <p className={`text-xs text-gray-500 dark:text-gray-400`}>
                    Upload From Gallery
                  </p>
                </>
              ) : (
                <div className="w-full">
                  <CustomNextImage
                    src={imagePreview}
                    width={100}
                    height={65}
                    alt=""
                    className="rounded-lg relative bg-black/15"
                    style={{
                      objectFit: "cover",
                      width: "100px",
                      height: "65px",
                    }}
                  />
                </div>
              )}

              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  selectFileImage(e.target.files)
                }
                type="file"
                className="hidden"
                accept="image/*"
                ref={inputImageRef}
              />
            </div>
          </label>
        </div>
      </div>

      <div className={`w-full bg-black/10 rounded-lg mb-5 ${videoStyle}`}>
        <video
          ref={videoRef}
          className="w-full h-[300px] object-cover rounded-lg"
          autoPlay
        ></video>
      </div>

      <div
        ref={storiesTextEditableRef}
        className={`${
          isDark
            ? "text-gray-200 border-gray-600/30"
            : "text-gray-800 border-gray-333/30"
        } textarea p-3 min-h-10 rounded-xl border text-center`}
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
      ></div>

      <Button
        placeholder={""}
        variant="gradient"
        color="pink"
        onClick={submitStory}
        className="mt-5 w-[200px] mx-auto flex justify-center"
        disabled={isLoading}
        fullWidth
      >
        {!isLoading && <span>Submit</span>}
        {isLoading && <Spinner className="size-5" />}
      </Button>
    </AnimateFadeOut>
  );
}
