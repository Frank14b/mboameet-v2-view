import { range } from "@/app/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export default function FeedSkeletonComponent({
  isLoading,
  count = 3,
}: {
  isLoading: boolean;
  count: number;
}) {
  if (!isLoading) return <></>;
  return (
    <>
      {range(1, count).map((value: number, index: number) => (
        <div
          className="w-full mt-6 bg-white dark:bg-black/15 rounded-xl"
          key={index}
        >
          <Card
            placeholder={""}
            className="mt-0 w-full animate-pulse dark:bg-gray-800"
          >
            {value%Math.floor(Math.random() * 4) == 0 && (
              <CardHeader
                placeholder={""}
                shadow={false}
                floated={false}
                className="relative grid h-56 place-items-center bg-gray-300 dark:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-12 w-12 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </CardHeader>
            )}

            <CardBody placeholder={""}>
              <Typography
                placeholder={""}
                as="div"
                variant="h1"
                className="mb-4 h-3 w-56 rounded-full bg-gray-300 dark:bg-gray-900"
              >
                &nbsp;
              </Typography>
              <Typography
                placeholder={""}
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300 dark:bg-gray-900"
              >
                &nbsp;
              </Typography>
              <Typography
                placeholder={""}
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300 dark:bg-gray-900"
              >
                &nbsp;
              </Typography>
              <Typography
                placeholder={""}
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300 dark:bg-gray-900"
              >
                &nbsp;
              </Typography>
              <Typography
                placeholder={""}
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300 dark:bg-gray-900"
              >
                &nbsp;
              </Typography>
            </CardBody>
            <CardFooter placeholder={""} className="pt-0">
              <Button
                placeholder={""}
                disabled
                tabIndex={-1}
                className="h-4 w-20 mr-3 bg-gray-300 dark:bg-gray-900 shadow-none hover:shadow-none"
              >
                &nbsp;
              </Button>
              <Button
                placeholder={""}
                disabled
                tabIndex={-1}
                className="h-4 mr-3 w-20 bg-gray-300 dark:bg-gray-900 shadow-none hover:shadow-none"
              >
                &nbsp;
              </Button>
              <Button
                placeholder={""}
                disabled
                tabIndex={-1}
                className="h-4 w-20 bg-gray-300 dark:bg-gray-900 shadow-none hover:shadow-none"
              >
                &nbsp;
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
