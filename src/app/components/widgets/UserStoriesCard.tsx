import { UserStoriesCardProps } from "@/app/types";
import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CustomNextImage from "./CustomNextImage";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function UserStoriesCard({
  id,
  bgImage,
  image,
  activeStory,
  onStoryClick,
}: UserStoriesCardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(id === activeStory);
  }, [activeStory, id, setIsActive]);

  return (
    <>
      <Card
        placeholder={""}
        shadow={false}
        className={`${
          isActive
            ? "fixed top-0 bottom-0 left-0 right-0 z-[99999]"
            : "relative grid h-[9rem] w-full max-w-[100rem] rounded-xl border-none bg-transparent items-end justify-center overflow-hidden text-center cursor-pointer"
        }`}
      >
        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          color="transparent"
          style={{ background: `url(${bgImage}) center/cover` }}
          className={`absolute inset-0 m-0 h-full w-full rounded-none border-none bg-cover bg-center`}
        >
          <div
            className={`to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t rounded-none from-black/90 via-black/50 ${
              isActive ? "backdrop-blur-lg" : "backdrop-blur-sm"
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
            alt="tania andrew"
            className="border-2 border-white rounded-full object-cover mt-5"
            src={image}
            onClick={() => onStoryClick?.(id)}
          />

          {isActive && (
            <div className="relative">
              <div className="h-[80vh] xs:h-[70vh] sm:h-[70vh] xs:mt-12 min-w-[350px] max-w-[30%] relative mx-auto">
                <IconButton
                  className="rounded-full absolute top-[-15px] left-[-10px] z-[9999] bg-transparent"
                  placeholder={""}
                  onClick={() => onStoryClick?.(0)}
                >
                  <PlusCircleIcon className="h-5 w-5 rotate-45" />
                </IconButton>

                <CustomNextImage
                  alt=""
                  src={image}
                  fill={true}
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
