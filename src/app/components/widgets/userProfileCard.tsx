import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";

export default function UserProfileCard({
  image,
  name,
  following,
  onClickBtn,
  onClickFollow,
}: {
  image: string;
  name: string;
  following: boolean;
  onClickBtn?: () => void;
  onClickFollow?: () => void;
}) {
  return (
    <>
      <Card placeholder={""} className="w-full dark:bg-gray-800">
        <CardHeader placeholder={""} floated={false} className="h-80">
          <Image
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
            color={following ? "red" : "white"}
            variant="text"
            className="!absolute top-4 right-4 rounded-full bg-gray-600"
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
        </CardHeader>
        <CardBody placeholder={""} className="text-center">
          <Typography
            placeholder={""}
            variant="h4"
            color="blue-gray"
            className="mb-2 dark:text-gray-300"
          >
            {name}
          </Typography>
        </CardBody>
        <CardFooter placeholder={""} className="flex justify-center gap-7 pt-2">
          <Button
            onClick={onClickBtn}
            placeholder={""}
            size="md"
            fullWidth={true}
          >
            Visit Profile
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
