import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import CustomNextImage from "./CustomNextImage";

export function NoDataFound({
  message,
  image,
  showMessage = true,
  customClass,
}: {
  message: string;
  image?: string;
  showMessage?: boolean;
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
        className="items-center grid justify-center dark:bg-gray-800"
      >
        <CustomNextImage
          height={200}
          width={200}
          src={image ?? "/no-results-bg.2d2c6ee3.png"}
          alt="card-image"
          className="object-cover rounded-full"
        />
      </CardHeader>
      <CardBody placeholder={""}>
        {showMessage && (
          <div className="mb-2 flex items-center justify-center">
            <Typography
              placeholder={""}
              color="blue-gray"
              className="font-bold dark:text-gray-300"
              variant="h6"
            >
              {message.length > 0 ? message : "NO DATA FOUND"}
            </Typography>
            <Typography
              placeholder={""}
              color="blue-gray"
              className="font-medium"
            >
              <></>
            </Typography>
          </div>
        )}
      </CardBody>
      <CardFooter placeholder={""} className="pt-0">
        <></>
      </CardFooter>
    </Card>
  );
}
