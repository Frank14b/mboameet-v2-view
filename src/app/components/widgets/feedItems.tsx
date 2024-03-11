import { useMainContext } from "@/app/contexts/main";
import { formatHashTags } from "@/app/lib/utils";
import { FeedFilesData, FeedItem } from "@/app/types";
import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  Carousel,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export default function FeedItemsComponent({ data, fileType }: FeedItem) {
  const mainContext = useMainContext();

  return (
    <>
      <Card placeholder={""} className="pb-3 pl-0 pr-0 w-full dark:bg-gray-800">
        <div className="grid justify-items-between">
          <List placeholder={""} className="px-0">
            <ListItem
              placeholder={""}
              disabled={false}
              className="px-3 bg-transparent"
            >
              <ListItemPrefix placeholder={""}>
                <Avatar
                  placeholder={""}
                  variant="circular"
                  alt="candice"
                  src={"https://docs.material-tailwind.com/img/face-1.jpg"}
                />
              </ListItemPrefix>
              <div>
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="dark:text-pink-200"
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
            </ListItem>
          </List>
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
                  autoplay={true}
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
                <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
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
                <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
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
                <div className="p-3 h-100">
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
          <span className="flex text-gray-600 dark:text-gray-200 text-sm cursor-pointer">
            <EyeIcon className="h-5 w-5" />
            &nbsp;6356
          </span>
          <span className="flex px-6 text-pink-300 dark:text-pink-300 text-sm cursor-pointer">
            <HeartIcon className="h-5 w-5" />
            &nbsp;Like
          </span>
          <span className="flex text-gray-600 dark:text-gray-200 text-sm cursor-pointer">
            <ChatBubbleBottomCenterIcon className="h-5 w-5" />
            &nbsp;Comment
          </span>
        </div>
      </Card>
    </>
  );
}
