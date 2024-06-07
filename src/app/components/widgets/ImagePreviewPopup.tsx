import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Carousel,
} from "@material-tailwind/react";
import CustomNextImage from "./CustomNextImage";

export type ImagePreviewProps = {
  url: string;
  title: string;
  description: string;
  type: string;
};

export function ImagePreviewPopup({
  active,
  images,
  open,
  onClose,
}: {
  active: ImagePreviewProps;
  images: ImagePreviewProps[];
  open: boolean;
  onClose: () => void;
}) {
  //
  return (
    <>
      <Dialog placeholder={""} size="lg" open={open} handler={onClose}>
        <DialogHeader placeholder={""} className="justify-between">
          <></>
        </DialogHeader>
        <DialogBody placeholder={""} className="max-h-[45em] overflow-y-auto">
          <Carousel
            loop={true}
            autoplay={true}
            autoplayDelay={10000}
            transition={{
              type: "spring"
            }}
            placeholder={""}
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            <CustomNextImage
              key={0}
              alt=""
              className="h-full w-full max-h-[40em] rounded-lg object-fill object-center"
              src={active?.url}
              height={1000}
              width={1000}
            />
            {images?.map(
              (image, index) =>
                image.url !== active?.url &&
                image.type == "image" && (
                  <CustomNextImage
                    key={index + 1}
                    alt=""
                    className="h-full w-full max-h-[40em] rounded-lg object-fill object-center"
                    src={image.url}
                    width={1000}
                    height={1000}
                  />
                )
            )}
          </Carousel>
          {/*  */}
        </DialogBody>
      </Dialog>
    </>
  );
}
