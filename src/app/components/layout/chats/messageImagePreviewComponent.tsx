import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Carousel,
} from "@material-tailwind/react";
import Image from "next/image";

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
      <Dialog placeholder={""} size="sm" open={open} handler={handleOpen}>
        <DialogHeader placeholder={""} className="justify-between">
          {/* <div className="flex items-center gap-3">
            <Avatar
              placeholder={""}
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="-mt-px flex flex-col">
              <Typography
                placeholder={""}
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Tania Andrew
              </Typography>
              <Typography
                placeholder={""}
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @emmaroberts
              </Typography>
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            {/* <IconButton placeholder={""} variant="text" size="sm" color={"red"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton> */}
          </div>
        </DialogHeader>
        <DialogBody placeholder={""}>
          <Carousel
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
            {images.map((image, index) => (
              <Image
                key={index}
                alt=""
                className="h-full w-full rounded-lg object-cover object-center"
                src={image.url}
                height={500}
                width={500}
              />
            ))}
          </Carousel>
          {/*  */}
        </DialogBody>
        {/* <DialogFooter placeholder={""} className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography
                placeholder={""}
                variant="small"
                color="gray"
                className="font-normal"
              >
                Views
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="small"
                color="gray"
                className="font-normal"
              >
                Downloads
              </Typography>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="font-medium"
              >
                553,031
              </Typography>
            </div>
          </div>
          <Button
            placeholder={""}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Share
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
}
