import { useMainContext } from "@/app/contexts/main";
import { formatHashTags } from "@/app/lib/utils";
import { useHomeContext } from "@/app/template";
import { FeedFilesData, FeedItem } from "@/app/types";
import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  Carousel,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function FeedItemsComponent({ data, fileType, onActionDelete }: FeedItem) {
  const mainContext = useMainContext();
  const homeContext = useHomeContext();

  const onActionEdit = () => {
    homeContext.setUpdateFeedItem(data)
    homeContext.handleOpenFeedForm(true);
  }

  const [deleteting, setDeleteting] = useState<boolean>(false);
  const referenceId: string = `feed-card-item-${data.id}`;

  const deleteItem = () => {
    setDeleteting(true);
    onActionDelete({itemId: data.id, itemRef: referenceId});

    setTimeout(() => {
      return setDeleteting(false);
    }, (10000));
  }

  return (
    <div id={referenceId}>
      <Card
        placeholder={""}
        className="pb-3 pl-0 pr-0 w-full border border-gray-200 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="grid justify-items-between w-full p-3">
          <div className="flex gap-3 w-full">
            <Avatar
              placeholder={""}
              variant="circular"
              alt="candice"
              src={"https://docs.material-tailwind.com/img/face-1.jpg"}
              className="cursor-pointer"
            />
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="dark:text-pink-200 cursor-pointer"
              >
                {data.user.userName}
              </Typography>
              <Typography
                placeholder={""}
                variant="small"
                className="font-normal dark:text-gray-500"
              >
                {new Date(data.createdAt).toDateString()}
              </Typography>
            </div>
            <div className="absolute right-5">
              <Menu placement="bottom-end">
                <MenuHandler>
                  <ListBulletIcon className="h-6 w-6 dark:text-gray-500 cursor-pointer" />
                </MenuHandler>
                <MenuList placeholder={""} className="p-0">
                  <MenuItem
                    placeholder={""}
                    className="flex items-center gap-2"
                    onClick={() => onActionEdit()}
                  >
                    <PencilIcon className="h-4 w-5" />
                    <Typography
                      placeholder={"Delete"}
                      variant="small"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    placeholder={""}
                    className="flex items-center gap-2"
                    onClick={() => deleteItem()}
                  >
                    <TrashIcon className="h-4 w-5" />
                    <Typography
                      placeholder={"Delete"}
                      variant="small"
                      className="font-medium"
                    >
                      Delete
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl px-3 py-3 text-sm text-black dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: formatHashTags(data.message) }}
        ></div>

        {data.feedFiles.length > 0 && (
          <>
            {fileType == "caroussel" && (
              <div className="p-0 my-3 h-80">
                <Carousel
                  placeholder={""}
                  loop={true}
                  autoplay={false}
                  className=""
                >
                  {data.feedFiles.map((image: FeedFilesData, index: number) => (
                    <img
                      key={index}
                      src={mainContext.getFileUrl(image.url)}
                      alt="image 1"
                      className="h-full w-full object-cover object-center"
                    />
                  ))}
                </Carousel>
              </div>
            )}

            {fileType == "image" && (
              <>
                <div className="grid my-3 min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
                  <div className="grid grid-cols-1">
                    <div>
                      <img
                        className="object-cover object-center h-90 max-w-full md:h-90"
                        src={mainContext.getFileUrl(data.feedFiles[0].url)}
                        alt="-"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {fileType == "images" && (
              <>
                <div className="grid my-3 min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
                  <div className="grid grid-cols-2">
                    {data.feedFiles.map(
                      (image: FeedFilesData, index: number) => (
                        <div key={index}>
                          <img
                            className="object-cover object-center h-90 max-w-full md:h-90 bg-white"
                            src={mainContext.getFileUrl(image.url)}
                            alt="-"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {fileType == "video" && (
              <>
                <div className="p-3 my-3 h-100">
                  <video
                    className="h-full w-full rounded-lg objectfit-cover"
                    controls
                    autoPlay
                  >
                    <source
                      src="https://docs.material-tailwind.com/demo.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            )}
          </>
        )}

        <div className="px-3 pt-2 flex">
          <span className="flex text-gray-600 dark:text-gray-200 text-xs cursor-pointer">
            <EyeIcon className="h-4 w-4" />
            &nbsp;0
          </span>
          <span className="flex px-6 text-gray-600 dark:text-gray-200 text-xs cursor-pointer">
            <HeartIcon className="h-4 w-4" />
            &nbsp;Like
          </span>
          <span className="flex text-gray-600 dark:text-gray-200 text-xs cursor-pointer">
            <ChatBubbleBottomCenterIcon className="h-4 w-4" />
            &nbsp;Comment
          </span>
        </div>

        {
          deleteting && <div className="absolute bg-white bg-opacity-60 dark:bg-gray-700 dark:bg-opacity-60 top-0 bottom-0 left-0 w-full z-index-999 rounded-lg"></div>
        }
        
      </Card>
    </div>
  );
}
