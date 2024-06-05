import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { SayHiChatPopupComponent } from "../layout/friends/sayHiChatPopupComponent";
import CustomNextImage from "./CustomNextImage";

export default function UserProfileCard({
  id,
  image,
  name,
  following,
  onClickBtn,
  onClickFollow,
  onClickShare,
}: {
  id: number;
  image: string;
  name: string;
  following: boolean;
  onClickBtn?: () => void;
  onClickFollow?: () => void;
  onClickShare?: () => void;
}) {
  return (
    <>  
      <Card placeholder={""} className="w-full dark:bg-gray-800">
        <CardHeader placeholder={""} floated={false} className="h-40 xs:h-[140px]">
          <CustomNextImage
            src={image}
            alt={name}
            fill={true}
            priority={true}
            sizes="1000"
            className="cardFriendsImage"
          />
          <IconButton
            onClick={onClickFollow}
            placeholder={""}
            size="sm"
            color={following ? "red" : "gray"}
            variant="text"
            className="!absolute top-4 right-4 rounded-full bg-gray-100"
          >
            <HeartIcon className="h-5 w-5" />
          </IconButton>

          <IconButton
            onClick={onClickShare}
            placeholder={""}
            size="sm"
            color={following ? "gray" : "gray"}
            variant="text"
            className="!absolute top-14 right-4 rounded-full bg-gray-100"
          >
            <ShareIcon className="h-5 w-5" />
          </IconButton>

          <SayHiChatPopupComponent id={id} name={name}>
            <IconButton
              placeholder={""}
              size="sm"
              color={following ? "blue" : "gray"}
              variant="text"
              className="!absolute top-24 right-4 rounded-full bg-gray-100"
            >
              <ChatBubbleBottomCenterIcon className="h-5 w-5" />
            </IconButton>
          </SayHiChatPopupComponent>
          {/* // */}
        </CardHeader>
        <CardBody placeholder={""} className="text-center">
          <div className="line-clamp-1">
            <Typography
              placeholder={""}
              variant="h4"
              color="blue-gray"
              className="text-sm dark:text-gray-300 capitalize"
            >
              {name}
            </Typography>
          </div>
        </CardBody>
        <CardFooter placeholder={""} className="flex justify-center gap-7 pt-0">
          <Button
            onClick={onClickBtn}
            placeholder={""}
            size="sm"
            fullWidth={true}
          >
            Visit Profile
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
