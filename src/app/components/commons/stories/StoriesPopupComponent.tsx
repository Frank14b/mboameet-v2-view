import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  CardBody,
  Card,
} from "@material-tailwind/react";

import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

import { useMainContext } from "@/app/contexts/main";
import { storiesTypes } from "@/app/lib/constants/app";
import StoriesTextComponent from "./StoriesTextComponent";
import AnimateHoverScale from "../../widgets/motions/AnimateHoverScale";
import StoriesImageComponent from "./StoriesImageComponent";
import { StoriesTypes } from "@/app/types";

export function StoriesPopupComponent() {
  //
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = useState<StoriesTypes | null>(null);

  const handleOpen = () => setOpen(!open);
  const { isDark } = useMainContext();

  const typeList = useMemo(() => {
    return (
      <>
        <div className="grid grid-cols-3 xs:grid-cols-2 justify-items-center gap-4">
          {storiesTypes.map((item, index) => (
            <Card
              key={index}
              placeholder={""}
              className={`w-full hover:scale-105 transform transition duration-2 hover:shadow-xl ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <CardBody
                placeholder={""}
                className="px-3 text-center cursor-pointer"
                onClick={() => setSelectedType(item.type)}
              >
                <div className="w-full justify-center grid mb-2 animate-pulse">
                  <item.icon
                    className={`${isDark ? "text-gray-500" : ""} h-8 w-8`}
                  />
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className={`${
                      isDark ? "text-gray-200" : ""
                    } font-bold text-center w-full`}
                  >
                    {item.title}
                  </Typography>
                </div>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="gray"
                  className={`${
                    isDark ? "text-gray-300" : ""
                  } font-normal opacity-75`}
                >
                  {item.subTitle}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </>
    );
  }, [setSelectedType]);

  const renderTypeComponent = useMemo(() => {
    if (selectedType == StoriesTypes.TEXT) {
      return <StoriesTextComponent handleClose={handleOpen}/>;
    } else if (selectedType == StoriesTypes.IMAGE) {
      return <StoriesImageComponent handleClose={handleOpen}/>;
    } else if (selectedType == StoriesTypes.VIDEO) {
      return <>Video</>;
    } else {
      return <></>;
    }
  }, [selectedType, handleOpen]);

  return (
    <>
      <Typography placeholder={""} className="font-bold px-1 pb-1 gap-3">
        Stories{" "}
        <Button
          placeholder={""}
          onClick={handleOpen}
          size="sm"
          className="bg-pink-600 mx-3 p-1 mt-[-4px]"
        >
          <PlusIcon className="w-4 h-4 cursor-pointer" />
        </Button>
      </Typography>

      <Dialog
        placeholder={""}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className={`${isDark ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <DialogHeader
          placeholder={""}
          className={`${isDark ? "text-gray-200" : ""} gap-3`}
        >
          {selectedType && (
            <a href="#" onClick={() => setSelectedType(null)}>
              <ArrowLeftIcon className="size-5" />
            </a>
          )}{" "}
          Stories
        </DialogHeader>
        <DialogBody placeholder={""}>
          {!selectedType ? (
            <AnimateHoverScale>{typeList}</AnimateHoverScale>
          ) : (
            <AnimateHoverScale>{renderTypeComponent}</AnimateHoverScale>
          )}
        </DialogBody>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
