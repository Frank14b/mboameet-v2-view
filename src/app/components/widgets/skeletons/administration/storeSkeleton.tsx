import { range } from "@/app/lib/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function StoreSkeleton({
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
        <Accordion
          placeholder={""}
          open={index === 0}
          key={index}
          className="border-b-2 dark:border-gray-800 animate-pulse"
          animate={{
            mount: { scale: 1 },
            unmount: { scale: 0.9 },
          }}
        >
          <AccordionHeader placeholder={""} className="border-0">
            <div className="flex w-full justify-between">
              <div className="flex gap-2 h-10 text-sm items-center dark:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-12 w-12 text-gray-500 rounded-full bg-gray-300 p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <div>
                  <h6 className="font-bold mb-1">
                    <Typography
                      placeholder={""}
                      as="div"
                      variant="paragraph"
                      className="mb-2 h-3 w-20 rounded-full bg-gray-300 dark:bg-gray-800"
                    >
                      &nbsp;
                    </Typography>
                  </h6>{" "}
                  <span className="font-normal text-gray-600">
                    <Typography
                      placeholder={""}
                      as="div"
                      variant="paragraph"
                      className="mb-2 h-3 w-60 rounded-full bg-gray-300 dark:bg-gray-800"
                    >
                      &nbsp;
                    </Typography>
                  </span>
                </div>
              </div>
              <div>
                <Typography
                  placeholder={""}
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-3 w-20 rounded-full bg-gray-300 dark:bg-gray-800"
                >
                  &nbsp;
                </Typography>
              </div>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="w-full">
              <Card
                placeholder={""}
                className="w-full shadow-none max-w-[100%] p-8 dark:bg-gray-800 dark:text-gray-100"
              >
                <CardBody placeholder={""} className="p-0 flex gap-5">
                  <ul className="flex flex-col gap-4 w-full">
                    {range(1, 3).map((value: number, index: number) => (
                      <li className="flex items-center gap-4" key={index}>
                        <Typography
                          placeholder={""}
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-3 w-60 rounded-full bg-gray-300 dark:bg-gray-700"
                        >
                          &nbsp;
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <ul className="w-full">
                    {range(1, 3).map((value: number, index: number) => (
                      <li className="flex items-center gap-4" key={index}>
                        <Typography
                          placeholder={""}
                          as="div"
                          variant="paragraph"
                          className={`mb-2 h-3 w-full rounded-full bg-gray-300 dark:bg-gray-700`}
                        >
                          &nbsp;
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
}
