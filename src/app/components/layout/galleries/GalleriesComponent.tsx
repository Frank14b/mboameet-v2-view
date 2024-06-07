import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { ChatMediaComponent } from "./ChatMediaComponent";
import { GalleriesHookDto } from "@/app/hooks/pages/galleries/useGalleries";
import { FeedMediaComponent } from "./FeedMediaComponent";

export function GalleriesComponent({
  galleryHook,
}: {
  galleryHook: GalleriesHookDto;
}) {
  return (
    <div className="w-full">
      <Card placeholder={""} className="dark:bg-gray-800">
        <CardBody placeholder={""}>
          <Timeline>
            <TimelineItem>
              {/* <TimelineConnector /> */}
              <TimelineHeader>
                <TimelineIcon className="p-2">
                  <BookmarkIcon className="h-4 w-4" />
                </TimelineIcon>
                <Typography
                  placeholder={""}
                  variant="h5"
                  color="blue-gray"
                  className="dark:text-gray-200"
                >
                  Feeds
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <FeedMediaComponent galleryHook={galleryHook} />
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              {/* <TimelineConnector /> */}
              <TimelineHeader>
                <TimelineIcon className="p-2">
                  <ChatBubbleBottomCenterIcon className="h-4 w-4" />
                </TimelineIcon>
                <Typography
                  placeholder=""
                  variant="h5"
                  color="blue-gray"
                  className="dark:text-gray-200"
                >
                  Chats
                </Typography>
              </TimelineHeader>
              <TimelineBody>
                <ChatMediaComponent galleryHook={galleryHook} />
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </CardBody>
      </Card>
    </div>
  );
}
