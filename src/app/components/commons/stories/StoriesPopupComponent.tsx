import React from "react";
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
import {
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useMainContext } from "@/app/contexts/main";
import { storiesTypes } from "@/app/lib/constants/app";

export function StoriesPopupComponent() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const { isDark } = useMainContext();

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
          className={`${isDark ? "text-gray-200" : ""}`}
        >
          Stories
        </DialogHeader>
        <DialogBody placeholder={""}>
          <div className="grid grid-cols-3 xs:grid-cols-2 justify-items-center gap-4">
            {storiesTypes.map((type, index) => (
              <Card
                key={index}
                placeholder={""}
                className={`w-full hover:scale-105 hover:shadow-xl ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                <CardBody
                  placeholder={""}
                  className="px-3 text-center cursor-pointer"
                >
                  <div className="w-full justify-center grid mb-2 animate-pulse">
                    <type.icon
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
                      {type.title}
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
                    {type.subTitle}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
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
