import { productCarouselResponsive } from "@/app/lib/constants/app";
import { range } from "@/app/lib/utils";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Carousel from "react-multi-carousel";

export function CarouselProductSkeleton({
  isLoading,
  count = 8,
}: {
  isLoading: boolean;
  count: number;
}) {
  if (!isLoading) return <></>;
  return (
    <>
      <Carousel responsive={productCarouselResponsive}>
        {range(1, count).map((value, index) => (
          <div
            className="p-2 hover:scale-105 animate-pulse transform transition duration-2"
            key={value + index}
          >
            <Card
              placeholder={""}
              className="dark:bg-gray-900 p-0 cursor-pointer bg-gray-100 w-full shadow-none border-2 border-gray-100 dark:border-none"
            >
              <CardBody
                placeholder={""}
                className="min-h-[30vh] dark:text-gray-100 py-2 pb-4 p-0 hover:shadow-xs"
              >
                <div className="h-[160px] relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-full h-[130px] text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
                <div className="w-full p-2 px-4 dark:text-gray-400">
                  <div className="">
                    <Typography
                      className="text-sm w-[90%] p-0 h-2 rounded-full bg-gray-300 dark:bg-gray-900"
                      placeholder={""}
                    >
                      <></>
                    </Typography>
                  </div>
                  <div className="line-clamp-1 text-[10px] dark:text-gray-600 mt-1">
                    <Typography
                      className="text-sm w-20 p-0 h-2 rounded-full bg-gray-300 dark:bg-gray-900"
                      placeholder={""}
                    >
                      <></>
                    </Typography>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <div className="line-clamp-1 text-xs flex gap-1 dark:text-gray-600">
                      <Typography
                        className="text-sm w-20 p-0 h-2 rounded-full bg-gray-300 dark:bg-gray-900"
                        placeholder={""}
                      >
                        <></>
                      </Typography>
                    </div>
                  </div>

                  <div className="w-full mt-4 flex justify-between text-xs">
                    <Typography
                      className="text-sm w-20 p-0 h-2 rounded-full bg-gray-300 dark:bg-gray-900"
                      placeholder={""}
                    >
                      <></>
                    </Typography>
                    <Typography
                      className="text-sm w-5 p-0 h-2 rounded-full bg-gray-300 dark:bg-gray-900"
                      placeholder={""}
                    >
                      <></>
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </Carousel>
    </>
  );
}
