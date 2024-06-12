import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineIcon,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ResultFriendsDto } from "@/app/types/friends";
import Image from "next/image";
import {
  CalendarIcon,
  EyeIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import CustomNextImage from "./CustomNextImage";

export function UserProfilePopup({
  show,
  user,
  onClose,
}: {
  show: boolean;
  user: ResultFriendsDto;
  onClose: () => void;
}) {
  //
  const [open, setOpen] = useState<boolean>(show);
  const handleOpen = () => onClose();
  const [userData, setUserData] = useState<ResultFriendsDto>(user);
  const [selectedImage, setSelectedImage] = React.useState("");

  const data = [
    {
      imageLink: userData?.photo ?? "",
    }
  ];

  useEffect(() => {
    setOpen(show);
    setUserData(user);
    setSelectedImage(user?.photo ?? "");
  }, [show, user, setOpen, setSelectedImage]);

  if (!open) return <></>;

  return (
    <>
      <Dialog
        placeholder={""}
        open={open}
        size="lg"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader placeholder={""}>{userData.fullName}</DialogHeader>
        <DialogBody placeholder={""}>
          <div className="grid grid-cols-2 xs:grid-cols-1 gap-4 overflow-y-auto xs:h-96">
            <div>
              <div className="xl:w-[25rem] w-full">
                <Timeline>
                  <TimelineItem className="h-15">
                    <TimelineHeader className="relative rounded-xl border-blue-gray-50 bg-white py-3 pl-4 pr-8">
                      <TimelineIcon className="p-2" variant="ghost">
                        <EyeIcon className="h-4 w-4" />
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                        >
                          {userData.likes} Views
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                  <TimelineItem className="h-15">
                    <TimelineHeader className="relative rounded-xl border-blue-gray-50 bg-white py-3 pl-4 pr-8">
                      <TimelineIcon className="p-2" variant="ghost">
                        <HeartIcon className="h-4 w-4 text-red-900" />
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                        >
                          {userData.likes} Likes
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                  <TimelineItem className="h-15">
                    <TimelineHeader className="relative rounded-xl border-blue-gray-50 bg-white py-3 pl-4 pr-8">
                      <TimelineIcon className="p-2" variant="ghost">
                        <UserCircleIcon className="h-4 w-4" />
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                        >
                          {userData.email}
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                  <TimelineItem className="h-15">
                    <TimelineHeader className="relative rounded-xl border-blue-gray-50 bg-white py-3 pl-4 pr-8">
                      <TimelineIcon className="p-2" variant="ghost">
                        <CalendarIcon className="h-4 w-4" />
                      </TimelineIcon>
                      <div className="flex flex-col gap-1">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          Member since:{" "}
                          {new Date(user.createdAt).toDateString()}
                        </Typography>
                      </div>
                    </TimelineHeader>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>
            <div className="w-full shadow-lg shadow-blue-gray-900/5 grid justify-items-center place-items-end">
              <CustomNextImage
                className="h-[380px] w-full max-w-full rounded-lg shadow-lg border object-cover object-center md:h-[380px]"
                src={selectedImage}
                alt={`${userData.fullName}`}
                width={2000}
                height={800}
              />

              <IconButton
                onClick={() => {}}
                placeholder={""}
                size="sm"
                color={"white"}
                variant="text"
                className="!absolute top-8 right-8 rounded-full bg-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </IconButton>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mt-3 rounded-lg">
            {data.map(({ imageLink }, index) => (
              <div key={index}>
                <CustomNextImage
                  width={1500}
                  height={1500}
                  onClick={() => setSelectedImage(imageLink)}
                  src={imageLink}
                  className="max-w-full h-20 cursor-pointer rounded-lg shadow-lg border object-cover object-center"
                  alt="gallery-image"
                />
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter placeholder={""}>
          {/* // */}
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
