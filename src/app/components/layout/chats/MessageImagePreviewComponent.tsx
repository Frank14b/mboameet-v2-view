import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Carousel,
} from "@material-tailwind/react";
import CustomNextImage from "../../widgets/CustomNextImage";

export type MessageImagePreviewProps = {
  url: string;
  title: string;
  description: string;
};

export function MessageImagePreviewComponent({
  active,
  images,
  open,
  onOpen,
}: {
  active: MessageImagePreviewProps;
  images: MessageImagePreviewProps[];
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}) {
  //
  const handleOpen = () => onOpen(!open);

  return (
    <>
      <Dialog placeholder={""} size="md" open={open} handler={handleOpen}>
        <DialogHeader placeholder={""} className="justify-between">
          <></>
        </DialogHeader>
        <DialogBody placeholder={""} className="max-h-[45em] overflow-y-auto">
          <Carousel
            loop={true}
            transition={{
              type: "spring",
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
              className="h-full w-full max-h-[40em] rounded-lg object-cover object-center"
              src={active?.url}
              height={500}
              width={500}
            />
            {images.map(
              (image, index) =>
                image.url !== active?.url && (
                  <CustomNextImage
                    key={index + 1}
                    alt=""
                    className="h-full w-full max-h-[40em] rounded-lg object-cover object-center"
                    src={image.url}
                    height={500}
                    width={500}
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
