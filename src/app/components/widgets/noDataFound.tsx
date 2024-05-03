import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

export function NoDataFound({
  message,
  customClass,
}: {
  message: string;
  customClass?: string;
}) {
  return (
    <Card
      placeholder={""}
      className={`w-full dark:bg-gray-900 dark:shadow-none ${customClass}`}
    >
      <CardHeader
        placeholder={""}
        shadow={false}
        floated={false}
        className="h-96 items-center grid justify-center dark:bg-gray-800"
      >
        <Image
          height={250}
          width={250}
          src={"/noData.gif"}
          alt="card-image"
          className="object-cover rounded-full"
        />
      </CardHeader>
      <CardBody placeholder={""}>
        <div className="mb-2 flex items-center justify-center">
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-bold dark:text-gray-300"
            variant="h6"
          >
            NO DATA FOUND
          </Typography>
          <Typography
            placeholder={""}
            color="blue-gray"
            className="font-medium"
          >
            <></>
          </Typography>
        </div>
        <Typography
          placeholder={""}
          variant="small"
          color="gray"
          className="font-normal opacity-75 dark:text-gray-300"
        >
          {message}
        </Typography>
      </CardBody>
      <CardFooter placeholder={""} className="pt-0">
        <></>
      </CardFooter>
    </Card>
  );
}
