import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Progress,
} from "@material-tailwind/react";

import { useCallback, useEffect, useState } from "react";
import CustomNextImage from "./CustomNextImage";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ResultStoriesDto, StoriesTypes } from "@/app/types";
import AnimateHoverScale from "./motions/AnimateHoverScale";

export interface UserStoriesCardProps {
  id: number;
  bgImage: string;
  image: string;
  activeStory: number;
  item: ResultStoriesDto;
  nextItem: ResultStoriesDto | undefined;
  onStoryClick?: (id: number) => void;
}

export default function UserStoriesCard({
  id,
  bgImage,
  image,
  item,
  nextItem,
  activeStory,
  onStoryClick,
}: UserStoriesCardProps) {
  //
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  let timer: NodeJS.Timeout | number | null = null;

  useEffect(() => {
    setIsActive(id === activeStory);
  }, [activeStory, id, setIsActive]);

  const updateProgressBar = useCallback(() => {
    if (!isActive) return setProgressBar(0);

    timer = setInterval(() => {
      if (progressBar >= 100) {
        timer && clearInterval(timer);

        if (nextItem) {
          return onStoryClick?.(nextItem.id);
        }

        return onStoryClick?.(0);
      }

      setProgressBar(progressBar + 1);
    }, 100);
  }, [isActive, progressBar, nextItem, setProgressBar, onStoryClick]);

  useEffect(() => {
    updateProgressBar();

    return () => {
      timer && clearInterval(timer);
    };
  }, [updateProgressBar]);

  return (
    <>
      <Card
        placeholder={""}
        shadow={false}
        className={`${
          isActive
            ? "fixed top-0 bottom-0 left-0 right-0 z-[99999] bg-transparent"
            : "relative grid h-[9rem] w-full max-w-[100rem] rounded-xl border-none bg-transparent items-end justify-center overflow-hidden text-center cursor-pointer"
        }`}
      >
        {isActive && (
          <div className="w-full">
            <Progress
              placeholder={""}
              color="pink"
              value={progressBar}
              size="sm"
            />
          </div>
        )}

        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          color="transparent"
          // style={{ background: `transparent` }}
          className={`absolute inset-0 m-0 h-full bg-transparent w-full rounded-none border-none bg-cover bg-center`}
        >
          <div
            className={`to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t rounded-none from-black/90 via-black/50 ${
              isActive ? "backdrop-blur-sm" : "backdrop-blur-sm"
            }`}
          />
        </CardHeader>
        <CardBody
          placeholder={""}
          className="relative py-10 px-6 md:px-12 border-none"
        >
          <CustomNextImage
            style={{ minWidth: "60px", minHeight: "60px" }}
            height={60}
            width={60}
            alt={item.user.userName}
            className="border-2 border-white rounded-full object-cover mt-5"
            src={
              !isActive && item.fileUrl?.length > 0
                ? item.fileUrl
                : item.user.photo
            }
            onClick={() => onStoryClick?.(id)}
          />

          {isActive && (
            <AnimateHoverScale>
              <div className="relative">
                <div className="h-[80vh] xs:h-[70vh] sm:h-[70vh] xs:mt-12 min-w-[350px] max-w-[30%] relative mx-auto">
                  <IconButton
                    className="rounded-full absolute top-[-15px] left-[-10px] z-[9999] bg-transparent"
                    placeholder={""}
                    onClick={() => onStoryClick?.(0)}
                  >
                    <PlusCircleIcon className="h-5 w-5 rotate-45" />
                  </IconButton>

                  <div className="relative">
                    <div className="media h-[75vh] flex items-center bg-pink-200 rounded-lg">
                      {item.type == StoriesTypes.IMAGE.toLowerCase() && (
                        <CustomNextImage
                          alt=""
                          src={item.fileUrl}
                          fill={true}
                          className="object-contain rounded-xl shadow-lg"
                        />
                      )}
                      {/*  */}

                      <div
                        className="w-full text-white text-center uppercase"
                        dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
                        suppressHydrationWarning={true}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateHoverScale>
          )}
        </CardBody>
      </Card>
    </>
  );
}
